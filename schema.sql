DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INTEGER NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);



SELECT top3000albums.year, top3000albums.album, top3000albums.position, top5000songs.song, top5000songs.artist
FROM top3000albums
INNER JOIN top5000songs
ON top3000albums.artist = top5000songs.artist
AND top3000albums.year=top5000songs.year
WHERE top3000albums.artist = 'the beatles' AND top5000songs.artist = 'the beatles'
ORDER BY top3000albums.year, top3000albums.position;


CREATE INDEX by_name ON top5000songs (`artist`);
CREATE INDEX by_date ON top5000songs (`year`);

