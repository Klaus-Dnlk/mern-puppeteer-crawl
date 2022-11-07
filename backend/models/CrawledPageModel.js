import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const crawledPageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: []
  },
  h1: {
    type: []
  },
  h2: {
    type: []
  },
  links: {
    type: []
  }
});

const CrawledPage = model('crawl', crawledPageSchema);

export default CrawledPage;
