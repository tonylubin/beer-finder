"use server";

import clientPromise from "./mongodb";

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
const getAllBeers = async () => {
  try {
    const connection = await clientPromise;
    const db = connection.db("punkapi");
    const data = await db
      .collection("beers")
      .find({})
      .sort({ _id: 1 })
      .toArray();
    return data;
  } catch (error) {
    console.error(error);
  } 
};

// filter functions
const addFilters = async (filters) => {
  try {
    const connection = await clientPromise;
    const db = connection.db("punkapi");
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
    let data = await db.collection("beers").aggregate(pipeline).toArray();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const paginatedResults = async (page) => {
  let resultsPerPage = 10;
  try {
    const connection = await clientPromise;
    const db = connection.db("punkapi");
    const data = await db
      .collection("beers")
      .find({})
      .sort({ _id: 1 })
      .limit(resultsPerPage)
      .skip(page * resultsPerPage)
      .toArray();
    return data;
  } catch (error) {
    console.error(error);
  } 

};

export { getAllBeers, addFilters, paginatedResults };
