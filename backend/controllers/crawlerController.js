import puppeteer from 'puppeteer';
import CrawledPage from '../models/CrawledPageModel';

let registry = {};

export const crawl = async (req, res, next) => {
  const website = req.query.website;

  if (!website) {
    const err = new Error('Required query website missing');
    err.status = 400;
    next(err);
  }

  try {
    const browser = await puppeteer.launch();

    let queue = [website];

    const responseObj = {
      url: '',
      title: [],
      h1: [],
      h2: [],
      links: []
    };

    while (queue.length > 0) {
      const url = queue[queue.length - 1];
      console.log('current url', url);
      const page = await browser.newPage();
      await page.goto(url);
      registry[url] = await page.$eval('*', el => el.innerText);
      queue.pop();

      const titles = await page.$$eval('title', titleEls => titleEls.map(t => t.textContent));
      const h1 = await page.$$eval('h1', headersEls => headersEls.map(e => e.textContent));
      const h2 = await page.$$eval('h2', headersEls => headersEls.map(e => e.textContent));
      const links = await page.$$eval('a', anchorEls => anchorEls.map(a => a.href));

      const filteredHrefs = links.filter(href => href.startsWith(website) && registry[href] === undefined);
      const uniqueLinks = [...new Set(filteredHrefs)];

      queue = [...new Set(queue)];

      responseObj.url = website;
      responseObj.title.push(...titles);
      responseObj.h1.push(...h1);
      responseObj.h2.push(...h2);
      responseObj.links.push(...uniqueLinks);

      await page.close();
    }

    // console.log('result: ', result);

    await CrawledPage.create(responseObj);

    browser.close();

    return res.status(200).send(responseObj);
  } catch (e) {
    console.log(e);
    res.status(500).send('Something broke');
  }
};

export const getHistory = async (req, res) => {
  const response = await CrawledPage.find();

  return res.status(200).send(response);
};
