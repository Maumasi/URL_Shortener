
module.exports = (shortLink) => {
    // remove chars before short link
  const beforeShortLink = shortLink.search('.fy/') + 4;

  const beginExtra = shortLink.slice(0, beforeShortLink);
  const key = shortLink.replace(beginExtra, '');
  // console.log(key);

  return key;
};
