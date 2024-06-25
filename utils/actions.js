"use server";

import clientPromise from "./mongodb";
import { dbName, collectionName, resultsPerPage } from "./constants";

// database expression queries
const brewedBefore = (date) => {
  return { first_brewed: { $lte: new Date(date) } };
};

const abv = (num) => {
  return { abv: { $lte: parseInt(num) } };
};

const foodPairings = (foodSelection) => {
  return {
    $search: {
      index: "default",
      text: {
        path: "food_pairing",
        query: foodSelection,
        synonyms: "foodPairingSynonyms",
      },
    },
  };
};

const textSearch = (searchTerm) => {
  return {
    $search: {
      index: "default",
      text: {
        query: searchTerm,
        path: ["name", "tagline", "description"],
      },
    },
  };
};

const compoundSearchQuery = (searchTerm, foodSelection) => {
  return {
    $search: {
      index: "default",
      compound: {
        must: [
          {
            text: {
              query: searchTerm,
              path: ["name", "tagline", "description"],
            },
          },
        ],
        filter: [
          {
            text: {
              path: "food_pairing",
              query: foodSelection,
              synonyms: "foodPairingSynonyms",
            },
          },
        ],
      },
    },
  };
};

// let foodPairings = (searchQuery) => {
//   return { food_pairing: { $regex: searchQuery, $options: "i" } };
// };

// let nameSearch = (term) => {
//   return {
//     $match: {
//       $or: [
//         { name: { $regex: term, $options: "i" } },
//         { tagline: { $regex: term, $options: "i" } },
//         { description: { $regex: term, $options: "i" } },
//       ],
//     },
//   };
// };

// adding filtered options
const getFilteredResults = async (pageNum, filters) => {
  try {
    const skips = resultsPerPage * (pageNum - 1);
    const connection = await clientPromise;
    const db = connection.db(dbName);
    let pipeline = [];
    for (let [key, value] of Object.entries(filters)) {
      let dbQueryExpr;
      switch (key) {
        case "abv_lt":
          dbQueryExpr = abv(value);
          pipeline.push({ $match: dbQueryExpr });
          break;
        case "food_pairing":
          dbQueryExpr = foodPairings(value);
          pipeline.unshift(dbQueryExpr);
          break;
        case "brewed_before":
          dbQueryExpr = brewedBefore(value);
          pipeline.push({ $match: dbQueryExpr });
          break;
        case "name":
          dbQueryExpr = textSearch(value);
          pipeline.unshift(dbQueryExpr);
          break;
      }
    }
    pipeline.push(
      {
        $facet: {
          resultsQuery: [
            { $sort: { _id: 1 } },
            { $skip: skips },
            { $limit: resultsPerPage },
          ],
          totalCount: [{ $count: "total" }],
        },
      },
      {
        $project: {
          totalCount: { $arrayElemAt: ["$totalCount.total", 0] },
          resultsQuery: 1,
        },
      }
    );
    // check for 2 $search queries --> to make a compound search query as only 1 $search allowed
    let pipelineCheck = pipeline.filter((el) => el["$search"]);
    if (pipelineCheck.length == 2) {
      let modifiedQuery = compoundSearchQuery(
        filters.name,
        filters.food_pairing
      );
      // remove search & add new search to start of pipeline
      pipeline = pipeline.filter((el) => !el["$search"]);
      pipeline.unshift(modifiedQuery);
    }

    let data = await db
      .collection(collectionName)
      .aggregate(pipeline)
      .toArray();
    // data.resultsQuery || data.totalCount
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

const paginatedResults = async (pageNum) => {
  try {
    // number of pages/documents to skip
    const skips = resultsPerPage * (pageNum - 1);
    const connection = await clientPromise;
    const db = connection.db(dbName);
    const data = await db
      .collection(collectionName)
      .find({})
      .sort({ _id: 1 })
      .skip(skips)
      .limit(resultsPerPage)
      .toArray();
    const totalCount = await db.collection(collectionName).countDocuments();
    return { data, totalCount };
  } catch (error) {
    console.error(error);
  }
};

export { getFilteredResults, paginatedResults };