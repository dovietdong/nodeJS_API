use nodejs_movie;
Create Table favorites
(
    id int PRIMARY KEY AUTO_INCREMENT,
    product_id int NOT NULL,
    account_id int NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
)