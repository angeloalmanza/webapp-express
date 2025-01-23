-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: movies_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

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
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `director` varchar(255) NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `release_year` year(4) DEFAULT NULL,
  `abstract` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Inception','Christopher Nolan','Science Fiction',2010,'A skilled thief is given a chance at redemption if he can successfully perform inception.',NULL,'2024-11-29 10:40:13','2024-11-29 10:40:13'),(2,'The Godfather','Francis Ford Coppola','Crime',1972,'The story of a powerful Italian-American crime family and their struggles.',NULL,'2024-11-29 10:40:13','2024-11-29 10:40:13'),(3,'Titanic','James Cameron','Romance',1997,'A romantic story set against the tragic sinking of the RMS Titanic.',NULL,'2024-11-29 10:40:13','2024-11-29 10:40:13'),(4,'The Matrix','The Wachowskis','Action',1999,'A hacker discovers the truth about his reality and his role in the war against its controllers.',NULL,'2024-11-29 10:40:13','2024-11-29 10:40:13'),(5,'Interstellar','Christopher Nolan','Science Fiction',2014,'A team of explorers travels through a wormhole in space to save humanity.',NULL,'2024-11-29 10:40:13','2024-11-29 10:40:13');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `vote` tinyint(4) NOT NULL CHECK (`vote` between 1 and 5),
  `text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_movie` (`movie_id`),
  CONSTRAINT `fk_movie` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,'Alice',5,'A mind-bending masterpiece.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(2,1,'Bob',4,'Great visuals and a compelling story.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(3,1,'Charlie',3,'Confusing at times, but worth watching.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(4,2,'Diana',5,'The best crime movie ever made.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(5,2,'Eve',5,'A cinematic classic that never gets old.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(6,2,'Frank',4,'A bit slow-paced but very impactful.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(7,3,'Grace',5,'A heartbreaking love story.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(8,3,'Hank',4,'Beautiful visuals and a moving plot.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(9,3,'Ivy',3,'A bit too melodramatic for my taste.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(10,4,'Jack',5,'A revolutionary film in every sense.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(11,4,'Karen',4,'Great action and a thought-provoking plot.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(12,4,'Liam',4,'A unique take on reality and perception.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(13,5,'Mia',5,'Visually stunning and emotionally resonant.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(14,5,'Noah',3,'Interesting ideas but too long.','2024-11-29 10:40:13','2024-11-29 10:40:13'),(15,5,'Olivia',4,'A beautiful story about love and survival.','2024-11-29 10:40:13','2024-11-29 10:40:13');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-29 11:43:19