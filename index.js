const express = require("express");
const request = require("request-promise");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());


const generateScraperUrl=(apiKey)=>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;




app.get("/", async(req, res) => {
  res.send("welcome to amazon scraper API");
});

//GET product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const {api_key}=req.query;
  //console.log("req:",productId);
  try {
    //bw response from scraper api
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`); 
    //request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`)will get info about a specific product
    res.json(JSON.parse(response));
  } catch(error) {
    res.json(error);
  }
});

//GET product reviews
app.get("/products/:productId/reviews", async (req, res) => {
    const { productId } = req.params;
    const {api_key}=req.query;
    //console.log("req:",productId);
    try {
      //bw response from scraper api
      const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`); 
      res.json(JSON.parse(response));
    } catch(error) {
      res.json(error);
    }
  });


//GET product offers
app.get("/products/:productId/offers", async (req, res) => {
    const { productId } = req.params;
    const {api_key}=req.query;
    //console.log("req:",productId);
    try {
      //bw response from scraper api
      const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`); 
      res.json(JSON.parse(response));
    } catch(error) {
      res.json(error);
    }
  });


//GET search results
app.get("/search/:searchQuery", async (req, res) => {
    const { searchQuery } = req.params;
    const {api_key}=req.query;
    //console.log("req:",productId);
    try {
      //bw response from scraper api
      const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`); 
      res.json(JSON.parse(response));
    } catch(error) {
      res.json(error);
    }
  });
  

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
