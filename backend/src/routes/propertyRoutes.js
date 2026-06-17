import express
from "express";

import protect
from "../middleware/authMiddleware.js";

import {

createListing,

getListings,

getMine,

updateListing,

deleteListing

}

from
"../controllers/propertyController.js";

const router =
express.Router();

router.get(
"/",
getListings
);

router.get(
"/mine",
protect,
getMine
);

router.post(
"/",
protect,
createListing
);

router.put(
"/:id",
protect,
updateListing
);

router.delete(
"/:id",
protect,
deleteListing
);

export default router;