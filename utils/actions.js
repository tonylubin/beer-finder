"use server";

import clientPromise from "./mongodb";
import { dbName, collectionName, resultsPerPage } from "./constants";

// database expression queries
let brewedBefore = (date) => {
  return { first_brewed: { $lte: new Date(date) } };
};

let abv = (num) => {
  return { abv: { $lte: parseInt(num) } };
};

let foodPairings = (searchQuery) => {
  return { food_pairing: { $regex: searchQuery, $options: "i" } };
};

let nameSearch = (term) => {
  return {
    $or: [
      { name: { $regex: term, $options: "i" } },
      { tagline: { $regex: term, $options: "i" } },
      { description: { $regex: term, $options: "i" } },
    ],
  };
};

// get all beers
const getInitialBeers = async () => {
  try {
    const connection = await clientPromise;
    const db = connection.db(dbName);
    const data = await db
      .collection(collectionName)
      .find({})
      .sort({ _id: 1 })
      .limit(resultsPerPage)
      .toArray();
    // document count
    const dbEntries = await db.collection(collectionName).countDocuments();  
    return { data, dbEntries };
  } catch (error) {
    console.error(error);
  } 
};

// filter functions
const addFilters = async (filters) => {
  try {
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
          pipeline.push({ $match: dbQueryExpr });
          break;
        case "brewed_before":
          dbQueryExpr = brewedBefore(value);
          pipeline.push({ $match: dbQueryExpr });
          break;
        case "name":
          dbQueryExpr = nameSearch(value);
          pipeline.push({ $match: dbQueryExpr });
          break;
      }
    }
    pipeline.push({ $sort: { id: 1 } });
    let data = await db.collection(collectionName).aggregate(pipeline).toArray();
    return data;
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
    return data;
  } catch (error) {
    console.error(error);
  }   
};

export { getInitialBeers, paginatedResults , addFilters };
