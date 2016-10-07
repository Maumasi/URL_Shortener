
module.exports = (shortLink) => {
    // remove chars before short link
  const beforeShortLink = shortLink.search('go/') + 3;

  // console.log(beforeShortLink);

  const beginExtra = shortLink.slice(0, beforeShortLink);
  const key = shortLink.replace(beginExtra, '');

  return key;
};
