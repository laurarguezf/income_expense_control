-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: localhost    Database: expenses_manager
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `idcategories` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  `icon` varchar(500) NOT NULL,
  `idtypes` int NOT NULL,
  PRIMARY KEY (`idcategories`),
  KEY `fk_categories_types1_idx` (`idtypes`),
  CONSTRAINT `fk_categories_types1` FOREIGN KEY (`idtypes`) REFERENCES `types` (`idtypes`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Alimentación','IoFastFood',1),(2,'Transporte','FaCar',1),(3,'Vivienda','FaHouseChimney',1),(4,'Salud','GiHealthNormal',1),(5,'Ocio','FaMasksTheater',1),(6,'Ropa','IoShirt',1),(7,'Educación','FaBookOpen',1),(8,'Cuidado personal','MdSelfImprovement',1),(9,'Otros','CgMoreO',1),(10,'Salario','FaMoneyBillWave',2),(11,'Reembolsos','HiReceiptRefund',2),(12,'Ventas','MdOutlinePointOfSale',2),(13,'Otros ingresos','SiMoneygram',2),(14,'Viajes','FaPlaneDeparture',1);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `idexpenses` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `amount` float NOT NULL,
  `idcategories` int NOT NULL,
  `idtypes` int NOT NULL,
  PRIMARY KEY (`idexpenses`),
  KEY `fk_expenses_categories_idx` (`idcategories`),
  KEY `fk_expenses_types1_idx` (`idtypes`),
  CONSTRAINT `fk_expenses_categories` FOREIGN KEY (`idcategories`) REFERENCES `categories` (`idcategories`),
  CONSTRAINT `fk_expenses_types1` FOREIGN KEY (`idtypes`) REFERENCES `types` (`idtypes`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (1,'2024-09-03','Compra del mes',129.46,1,1),(3,'2024-09-02','entradas de cine',21.4,5,1),(4,'2024-09-05','pantalones vaqueros',45,6,1),(5,'2024-10-04','alquiler plaza garaje',80,13,2),(6,'2024-10-04','compra',100.99,1,1),(7,'2024-10-01','nómina de octubre',2100,10,2),(8,'2024-08-21','bolera',33.2,5,1),(9,'2024-10-05','Chaqueta esquí',210.95,6,1),(10,'2024-08-01','venta segunda mano',345,12,2),(11,'2024-08-15','reparación coche',1100,9,1),(12,'2024-08-29','devolucion entradas concierto',96.95,11,2),(13,'2024-10-03','venta ropa segunda mano',500,12,2),(14,'2024-10-05',NULL,44,1,1),(15,'2024-08-01','Nómina',1896.98,10,2),(16,'2024-10-16','Taxi',23.45,2,1),(48,'2024-09-01',NULL,1987.43,10,2);
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `idtypes` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(45) NOT NULL,
  PRIMARY KEY (`idtypes`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'gasto'),(2,'ingreso');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-16 18:08:27
