-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-08-31 10:37:32.251

-- tables
-- Table: order
CREATE TABLE order (
    id integer NOT NULL CONSTRAINT order_pk PRIMARY KEY,
    order_no character(12) NOT NULL,
    sales_person_id integer NOT NULL,
    date datetime NOT NULL,
    CONSTRAINT client_order FOREIGN KEY (sales_person_id)
    REFERENCES sales_person (id)
);

-- Table: order_item
CREATE TABLE order_item (
    id integer NOT NULL CONSTRAINT order_item_pk PRIMARY KEY,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    amount integer NOT NULL,
    CONSTRAINT order_order_item FOREIGN KEY (order_id)
    REFERENCES "order" (id),
    CONSTRAINT product_order_item FOREIGN KEY (product_id)
    REFERENCES product (id)
);

-- Table: product
CREATE TABLE product (
    id integer NOT NULL CONSTRAINT product_pk PRIMARY KEY,
    sku character(10) NOT NULL,
    name varchar(255) NOT NULL,
    price decimal(12,2) NOT NULL,
    in_stock integer NOT NULL
);

-- Table: sales_person
CREATE TABLE sales_person (
    id integer NOT NULL CONSTRAINT sales_person_pk PRIMARY KEY,
    full_name varchar(255) NOT NULL,
    password varchar(20) NOT NULL
);

-- End of file.
