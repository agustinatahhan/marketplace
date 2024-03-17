CREATE DATABASE `modamia`;

USE `modamia`;

CREATE TABLE `Products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `price` INT(11) NOT NULL,
   `description` TEXT,
   `img` VARCHAR(255),
   `stock` INT,
   `userId` INT(11),
   PRIMARY KEY (`id`)
);

CREATE TABLE `Sizes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products_sizes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `productId` INT NOT NULL,
   `sizes_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Orders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `totalAmount` DECIMAL NOT NULL,
   `userId` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `ordersdetails` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `orderId` INT NOT NULL,
   `productId` INT NOT NULL,
   `quantity` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `firstName` VARCHAR(255) NOT NULL,
   `lastName` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `client` TINYINT DEFAULT 1,
   PRIMARY KEY (`id`)
);


ALTER TABLE `Products` ADD CONSTRAINT `FK_e9df79c1-189c-4b85-aafa-ebd1d57bb650` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)  ;

ALTER TABLE `products_sizes` ADD CONSTRAINT `FK_dbfdd1fe-0ce0-44b9-955e-d548fcd5855e` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`)  ;

ALTER TABLE `products_sizes` ADD CONSTRAINT `FK_ee6f9ff5-122e-49fe-bd57-cf3906ea2e56` FOREIGN KEY (`sizes_id`) REFERENCES `Sizes`(`id`)  ;

ALTER TABLE `Orders` ADD CONSTRAINT `FK_049da6d0-4add-4638-9263-0d10d3e0b240` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)  ;

ALTER TABLE `ordersdetails` ADD CONSTRAINT `FK_7151f917-137d-43aa-995d-dd046acd415d` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`)  ;

ALTER TABLE `ordersdetails` ADD CONSTRAINT `FK_373ffbbc-e2dc-4c09-86bd-46e77c225184` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`)  ;
