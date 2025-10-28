CREATE DATABASE  IF NOT EXISTS `rampage_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rampage_store`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: rampage_store
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `direction` varchar(255) DEFAULT NULL,
  `id_produto` bigint NOT NULL,
  `main_image` bit(1) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Vans Vermelho Cima.jpg',1,_binary '','Vans Vermelho Cima.jpg',_binary ''),(2,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Vans Vermelho Perspectiva .jpg',1,_binary '\0','Vans Vermelho Perspectiva .jpg',_binary ''),(3,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Vans Vermelho.jpg',1,_binary '\0','Vans Vermelho.jpg',_binary ''),(4,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Vans Preto Cima.jpg',2,_binary '','Vans Preto Cima.jpg',_binary ''),(5,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Vans Preto Perspectiva.jpg',2,_binary '\0','Vans Preto Perspectiva.jpg',_binary ''),(6,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Vans Preto.jpg',2,_binary '\0','Vans Preto.jpg',_binary ''),(7,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Nike Dankie Cinza Cima.jpg',3,_binary '','Nike Dankie Cinza Cima.jpg',_binary ''),(8,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Nike Dankie Cinza.jpg',3,_binary '\0','Nike Dankie Cinza.jpg',_binary ''),(9,'F:\\PIStrint2\\Back-end\\Rampage\\rampagestore\\images\\Nike Dankie Perspectiva.jpg',3,_binary '\0','Nike Dankie Perspectiva.jpg',_binary ''),(10,'C:\\Users\\Secretaria\\Desktop\\Back-end\\Rampage\\rampagestore\\images\\25ecc1ec-bff8-4cc5-8c44-c47c7a005b72.jpg',1,_binary '','Tênis Nike Dunk Hi Retro Se Oly Masculino Cima.jpg',_binary ''),(11,'C:\\Users\\Secretaria\\Desktop\\Back-end\\Rampage\\rampagestore\\images\\b509f044-8783-40e0-94f9-e9c24350263f.jpg',1,_binary '\0','Tênis Nike Dunk Hi Retro Se Oly Masculino Perspectiva.jpg',_binary ''),(12,'C:\\Users\\Secretaria\\Desktop\\Back-end\\Rampage\\rampagestore\\images\\f5e15336-2b0f-49b9-a249-c49d8796f3e7.jpg',1,_binary '\0','Tênis Nike Dunk Hi Retro Se Oly Masculino.jpg',_binary '');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `avaliation` double NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `product_detai` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_price` decimal(38,2) DEFAULT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,15,4.7,'2024-10-01 16:27:15.757913','Gêneros: Homens. Coleção: Novidades. Tipo de Produto: Tênis. Cor: Azul. Cod. Ref. Variação: FV661-2.','Tênis Nike Dunk Hi Retro Se Oly Masculino',999.99,_binary '');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cpf` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','CONSUMER','STOKIST') NOT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'12345678901','2024-10-01 17:04:34.973769','Teste.Consumer@example.com','Teste Consumer','$2a$10$wxVqFbeQX0AQ1pW6JX0oyuhfH487m7Dsdf4hlu8JMxj9kPvPK5PX.','CONSUMER',_binary ''),(2,'12345678901','2024-10-01 17:04:46.617554','Teste.Admin@example.com','Teste Admin','$2a$10$QzUpuiVbXOfd5iPKDG9PcOc.KIzEmHVXewouKslPfgdzRj/4u.X3q','ADMIN',_binary ''),(3,'12345678901','2024-10-01 17:04:59.585516','Teste.Stokist@example.com','Teste Stokist','$2a$10$gloMDm0UpcTTl2DlOzO6d.SuawxJO8vx/kGtHgxxGNmEvktZE78BO','STOKIST',_binary '');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-01 17:15:46
