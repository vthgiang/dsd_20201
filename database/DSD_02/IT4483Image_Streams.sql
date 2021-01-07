-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: aws-minh.c9cs4wwi3y6p.us-west-2.rds.amazonaws.com    Database: IT4483Image
-- ------------------------------------------------------
-- Server version	5.7.30

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Streams`
--

DROP TABLE IF EXISTS `Streams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Streams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sessionDescription` longtext COLLATE utf8_unicode_ci,
  `problemType` int(11) DEFAULT NULL,
  `link` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `startTime` timestamp NULL DEFAULT NULL,
  `stopTime` timestamp NULL DEFAULT NULL,
  `metaData` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Streams`
--

LOCK TABLES `Streams` WRITE;
/*!40000 ALTER TABLE `Streams` DISABLE KEYS */;
INSERT INTO `Streams` VALUES (3,'Video trực tiếp 05:16:05 25/16/2020','Stream sự cố cháy rừng chiều ngày 24/12',0,'https://cdn.videvo.net/videvo_files/video/free/2019-12/small_watermarked/190915_A_04_Drone_16_preview.webm','2020-12-25 09:26:47','2020-12-25 09:28:47',''),(4,'Video trực tiếp 05:28:12 25/28/2020','Stream sự cố cháy rừng chiều ngày 24/12',0,'https://cdn.videvo.net/videvo_files/video/free/2017-12/small_watermarked/171124_B1_HD_001_preview.webm','2020-12-25 09:26:47','2020-12-25 10:28:47',''),(5,'Video trực tiếp 05:32:03 25/32/2020','Stream sự cố cháy rừng chiều ngày 24/12',0,'https://cdn.videvo.net/videvo_files/video/free/2017-12/small_watermarked/171124_B1_HD_001_preview.webm','2020-12-25 09:26:47','2020-12-25 10:28:47','');
/*!40000 ALTER TABLE `Streams` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-06 22:04:09
