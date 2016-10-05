
// TODO: must test all of the new routes
module.exports = (shortLink) => {
    // remove chars before short link
  const beforeShortLink = shortLink.search('/') + 1;

  console.log(beforeShortLink);

  const beginExtra = shortLink.slice(0, beforeShortLink);
  const key = shortLink.replace(beginExtra, '');

  return key;
};
