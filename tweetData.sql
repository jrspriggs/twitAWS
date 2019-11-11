-- MySQL dump 10.13  Distrib 5.5.61, for Linux (x86_64)
--
-- Host: localhost    Database: tweetData
-- ------------------------------------------------------
-- Server version	5.5.61

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tweetData`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tweetData` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `tweetData`;

--
-- Table structure for table `hashtags`
--

DROP TABLE IF EXISTS `hashtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hashtags` (
  `tag` varchar(30) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `general` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtags`
--

LOCK TABLES `hashtags` WRITE;
/*!40000 ALTER TABLE `hashtags` DISABLE KEYS */;
INSERT INTO `hashtags` VALUES ('funny',5,0),('lol',3,0),('comedy',6,0),('iartg',5,1),('bookboost',9,1),('fantasy',7,0),('humor',5,0),('kindle',6,1),('paperback',9,0),('amwriting',9,1),('amwritingFantasy',16,0),('authorUproar',12,1),('paranormal',10,0),('satire',6,0),('booklover',9,1),('bookworm',8,1),('booknerd',8,1),('Hucksters4Life',14,1);
/*!40000 ALTER TABLE `hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mediumTweets`
--

DROP TABLE IF EXISTS `mediumTweets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mediumTweets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tweet` varchar(260) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `mediumUrl` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mediumTweets`
--

LOCK TABLES `mediumTweets` WRITE;
/*!40000 ALTER TABLE `mediumTweets` DISABLE KEYS */;
INSERT INTO `mediumTweets` VALUES (1,'Check out the first in the series, The Misadventures of Tom: Dubstep Bard. In episode 1, Tom \"rescues\" Prince Theramin from an evil warlord. #shortStory #humor',159,'https://medium.com/story-of-the-week/the-misadventures-of-tom-dubstep-bard-episode-1-92644b0975c0?source=friends_link&sk=865abe5434cf82921cd67fe11eb8f26d'),(2,'The Misadventures of Tom: Dubstep Bard, Episode 2! Tom and Theramin must battle their way past Dragonspit\'s men through the dark forest. #shortStory #humor',159,'https://medium.com/story-of-the-week/the-misadventures-of-tom-dubstep-bard-9982cadfd9cf?source=friends_link&sk=00517a0dc3d22aafbfeb3daf73a105c5'),(3,'What sort of trouble will Tom get into when he and Prince Theramin meet the farmer\'s daughter? Find out in the third installment of The Misadventures of Tom: Dubstep Bard! #shortStory #humor',191,'https://medium.com/story-of-the-week/the-misadventures-of-tom-dubstep-bard-97263259a53?source=friends_link&sk=fa80c300357a0c615d5259ade7f8e2bf'),(4,'Remember that time a magical creature stole your child\'s discarded body parts? Now you will...Check out Molar Murder by @joelspriggs #shortstory #fantasy #noir #MurderMystery',175,'https://medium.com/story-of-the-week/molar-murder-3cfff82322a7?source=friends_link&sk=f17f14c4fc4e8453c0e76b843b05ee2b'),(5,'Neighbors aren\'t always very neighborly. #shortStory #biographical #neighbors #suburbanLife',92,'https://medium.com/@joel.spriggs/the-neighbors-that-tried-to-kill-grandpa-c57c702e290b?source=friends_link&sk=8d497dbaa8dde07249dd4ec219b935e9'),(6,'You don\'t need to be a superhero to rebel in tiny ways, but it sure does make it easier. Read \"The Sandwich Artist\" by @joelspriggs #author #shortStory #fantasy #superheroes #Sandwiches',209,'https://medium.com/story-of-the-week/the-sandwich-artist-f24ffc15106?source=friends_link&sk=bd565b209410415bf2faffb2d8e71e83'),(7,'Waking up in an asylum isn\'t fun. Especially as a magical practitioner related to gods and necromancers. Esmy has a fun time sharing these facts with her new therapist. #shortStory #humor #necromancy',203,'https://medium.com/@joel.spriggs/i-woke-up-like-this-9867819e89?source=friends_link&sk=7084ae929c82109a12da575cc49cfd9d'),(8,'When you\re a beginning practitioner of necromancy, a trip to the beach may not be as simple as it sounds. Just like Jake and Esmy discovered. #shortStory #humor #necromancy',173,'https://medium.com/@joel.spriggs/noob-necromancy-on-the-beach-8d199d8ee557?source=friends_link&sk=8cb3f4508f364f6cc843000404fc803d');
/*!40000 ALTER TABLE `mediumTweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nouns`
--

DROP TABLE IF EXISTS `nouns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nouns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noun` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nouns`
--

LOCK TABLES `nouns` WRITE;
/*!40000 ALTER TABLE `nouns` DISABLE KEYS */;
INSERT INTO `nouns` VALUES (1,'dog'),(2,'cat'),(4,'lake'),(5,'book'),(6,'salad'),(7,'guitar'),(8,'hippie'),(9,'conscientious objector'),(10,'tyrant'),(11,'sour cream'),(12,'matzah ball soup'),(13,'Google'),(14,'video game'),(15,'first edition signed copy of Martha Stewart\'s first cookbook'),(16,'burger'),(17,'hotdog vendor'),(18,'fish'),(19,'sea monster'),(20,'eggplant parmesan'),(23,'tofu'),(24,'bed'),(25,'ghost'),(26,'demon'),(27,'goblin'),(28,'Subway Sandwich Artist'),(29,'beard of bees'),(30,'Wendigo Sandwich'),(32,'demonic hatchimal'),(34,'Fruit Salad'),(36,'twerking alien of @Patrickfjohnson'),(37,'@TrayGang7'),(38,'rubber duck'),(40,'regrets of @DeanBradleySFF');
/*!40000 ALTER TABLE `nouns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `places` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (1,'an Olive Garden'),(2,'a Texas Roadhouse parking lot'),(3,'JFK International Airport'),(4,'an Applebees bathroom'),(5,'a ventilation shaft'),(6,'a pie eating competition'),(7,'a park pool'),(8,'Disney World'),(9,'a Congressional Representative\'s office'),(10,'Hannibal Lecter\'s home office'),(11,'a bar'),(12,'a garden party at a British estate'),(13,'Buckingham Palace'),(14,'the Taj Mahal'),(15,'the Eiffel Tower'),(16,'Mount Rushmore'),(17,'the Grand Canyon'),(18,'your cousin Earl\'s Bris'),(19,'a Petco'),(20,'a mafia hideout'),(21,'a wedding for two people you\'ve never met'),(22,'a log cabin in the woods, shivering and afraid'),(23,'the assassination of Abraham Lincoln'),(24,'an office'),(25,'the Puking Moose, a rundown biker bar'),(27,'the worst strip club in the world your friend Johnny found in a drunken stupor back in \'06'),(28,'a burned out yellow sports car'),(29,'a train station at 2 in the morning'),(30,'a Walmart fitting room'),(31,'the secret warehouse lair of the villainous Starbucks CEO'),(32,'Elon Musk\'s Secret Volcano hideout'),(33,'a nunnery'),(34,'an Orcish nudist colony'),(35,'the Mar-A-Lago Golden Shower Stall'),(36,'the colon of a blue whale'),(37,'cyberspace'),(38,'a toilet stall at a public library'),(39,'a bloody field outside of Plano, Illinois'),(40,'a post-apocalyptic LA drainage ditch'),(41,'James Brown\'s private bathroom');
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pluralNouns`
--

DROP TABLE IF EXISTS `pluralNouns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pluralNouns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noun` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pluralNouns`
--

LOCK TABLES `pluralNouns` WRITE;
/*!40000 ALTER TABLE `pluralNouns` DISABLE KEYS */;
INSERT INTO `pluralNouns` VALUES (1,'radios'),(3,'elves'),(4,'cats'),(5,'dogs'),(6,'farts'),(7,'hippopotami'),(8,'druids'),(9,'demons'),(10,'angels'),(11,'leprechauns'),(12,'glam rockers'),(13,'indecent carolers'),(14,'anatomically correct snow people'),(15,'car salespeople'),(16,'servers'),(17,'desks'),(18,'spoons'),(19,'elderly mariachi'),(20,'punch-drunk boxers'),(21,'gas station attendants'),(22,'trees'),(23,'dwarves'),(24,'dragons'),(25,'wizards and witches'),(26,'dry cleaners'),(27,'pizza chefs');
/*!40000 ALTER TABLE `pluralNouns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sourceTags`
--

DROP TABLE IF EXISTS `sourceTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sourceTags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sourceTag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sourceTags`
--

LOCK TABLES `sourceTags` WRITE;
/*!40000 ALTER TABLE `sourceTags` DISABLE KEYS */;
INSERT INTO `sourceTags` VALUES (1,'#iartg'),(2,'#bookboost'),(3,'#amwriting'),(4,'#writingCommunity'),(5,'#Hucksters4Life');
/*!40000 ALTER TABLE `sourceTags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweets`
--

DROP TABLE IF EXISTS `tweets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tweets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tweet` varchar(280) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `ASIN` varchar(50) DEFAULT NULL,
  `card_uri` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweets`
--

LOCK TABLES `tweets` WRITE;
/*!40000 ALTER TABLE `tweets` DISABLE KEYS */;
INSERT INTO `tweets` VALUES (1,'\"Don’t say it,” Esmy interrupted. “Don’t you fucking say it.\"\n\"That is why real witches do NOT ride Rubbermaid,\" replied Loki.',126,'B07DB15B2F',''),(2,'“This looks like about three felonies depending on what you’ve done to that guy and if that’s his blow up doll or yours.”',121,'B07DB15B2F',''),(3,'Need something to do for the weekend? So did Esmy, until some extended family found her. Now she\'s hip deep in a world of gods, magic and cryptids!',147,'B07DB15B2F',''),(4,'? Magic\n? Gods\n? Voodoo\n? Vampires\n? Dumbasses\n? Canadians\n? Girl Scouts\nOver a God’s Dead Body, a fantasy novel with a bit of everything.',139,'B07DB15B2F',''),(5,'*at five guys, waiting on burgers*\n*Crack a peanut*\n*No peanut, little demon pops out*\n*Lean in, demon waves closer*\n*Demon is actually me*\n\"Buy my book\"',153,'B07DB15B2F',''),(6,'“wait, you are telling us vampirism is a sexually transmitted disease?”',71,'B07DB15B2F',''),(7,'“well, let’s see, dad was a high priest of the pit and I think grandma married a Polynesian demigod.\"',101,'B07DB15B2F',''),(8,'\"we also don’t know when the TV is at either... it could be sitting in the middle of an Apache or Miami encampment in the fifteenth century\"',140,'B07DB15B2F',''),(9,'Think student loans are bad? Imagine owing a chaos God your freedom.  Now there are some harsh interest rates.',110,'B07DB15B2F',''),(10,'Esmy asked, “are all gods obsessed with bigfoot dicks?”\nLoki sighed, “I don’t know so far it’s two for two this week, but it seems like a low sample size.”',155,'B07DB15B2F',''),(11,'Esmy shook the keys at the sky and shouted, “Fuck women’s pants and their lack of REAL. FUCKING. POCKETS!”',106,'B07DB15B2F',''),(12,'Could vampirism be considered a handicap under the Americans with Disabilities act?  Maybe, in the meantime order Over a God\'s Dead Body!',137,'B07DB15B2F',''),(13,'Looking for a good mix of satire and action in a fun fantasy novel? Check out Over A God\'s Dead Body',100,'B07DB15B2F',''),(14,'Dr Longfellow leaned back in his chair and looked in disbelief. “Jack was blowing a bigfoot?”',93,'B07DB15B2F',''),(15,'Loki looked horrified at the mirror, turning up his lip in disgust. “Come on, Seth, there are just some things you don’t ask, alright?”',135,'B07DB15B2F',''),(16,'The right side of the mirror erupted with sound as the man in the bed abruptly sat straight up and screamed, “COME ON BARBIE, LET’S GO PARTY!”',142,'B07DB15B2F',''),(17,'\"It\'s like Deadpool goes to Hogwarts\" - some guy likely said this...sometime.',77,'B07DB15B2F',''),(18,'\"You may need to see a shrink, Jake, if you keep having dreams where I tell you it’s a good idea to hunt dinosaurs by fisting them with rat poison.\"',148,'B07DB15B2F',''),(19,'“What the fuck do you mean, ‘why would I need weaponized ducks?’ That’s the most ri-fucking-diculus question you could ask. Why the hell wouldn’t you weaponize the zombie ducks?\"',178,'B07DB15B2F',''),(20,'“Damn it Esmeralda, you know vampirism is an irreversible syndrome, quit being so damned insensitive to the handicapped!”',121,'B07DB15B2F',''),(21,'This story really surprised me. I liked the way it covered all the different \"gods.\" The story is irreverent and fun - Amazon Review',133,'B07DB15B2F',''),(22,'A story about the afterlife, one about a has been hero, a short battle of luck and fate, and a disturbing tale of a man hell-bent on finding his elves.',154,'B07H65HX56',''),(23,'Want a cheap small short story collection? How about 4 short stories for a #99cents on #kindle? That\'s what this is, 4 trips to the gumball machine of fantasy short stories.',175,'B07H65HX56',''),(25,'- \"Energizing\"\n- \"Delightful, Fast-Paced, Clean, & Could Not Put Down\"\n- \"Must buy!!\"\n\nJust a few of the many great things readers are raving about Party Central by @mandylawson7!',183,'1717979262',''),(26,'- \"Great Read\"\n- \"Loved it!\"\n- \"This book is amazing! The format and the story line are just astounding!\"\n\nJust a few of the many great things readers are saying about From New York to L.A. by @mandylawson7!',211,'1723941026',''),(27,'They were testing dozens of humans, searching for one who showed bravery in the face of certain death.\n\nBut what they got was Frank Ford.\n\nFind out more in the thrilling sci-fi Custodian: Monster of Earth Book One by @patrickfjohnson',237,'B0792R4CLR',''),(28,'- \"Great job of creating an engrossing story!\"\n- \"Excellent followup to Book 1 Custodian\"\n- \"An Excellent Sci-Fi Adventure\"\n\nFind out more in the thrilling sci-fi Angel: Monster of Earth Book Two by @patrickfjohnson',219,'B07959PKLG',''),(29,'- \"A mind-warping bounce from past to present and back in non-linear fashion. Exceptionally clever!\"\n- \"Wonderfully imaginative\"\n\nFind out more in the thrilling sci-fi adventure Between Two Minds by @dcwrighthammer2',218,'B0759ZG4VZ',''),(33,'From mind-bending sci-fi and fantasy to raw, powerful poetry to slice-of-life literary works, Carrying Fire has 41 fiction short stories and poems for everyone! All profits go to @Endofound to fund endometriosis research & advocacy.',233,'B07J685HSM','card://1148271038381404160'),(34,'Every young person has a right to safe housing. Help end LGBTQ+ youth homelessness with Shades of Pride, a collection of LGBTQ+ works, with 100% of the profits donated to @TrueColorsUnite',188,'B07SMVNTSL','card://1148272859976011779'),(35,'Support @TrueColorsUnite, who work to end homelessness among LGBTQ+ youth, with Shades of Pride! This 20-work collection celebrates #lgbtqia2 voices, characters, & themes! Buy your copy!',187,'B07SMVNTSL','card://1148272859976011779'),(36,'Add Kindred to your book family! This collection of short stories and poetry is a celebration of everything family life has to offer. Every penny goes to @kempefoundation, aiming to help prevent and stop child abuse altogether.',229,'B07P8Y26QW','card://1148284623421677568'),(37,'Do you love stories and poetry of sibling dynamics, parenting, found families, grief, reconciliation, and the many other stories of family that beg to be written? Kindred is perfect for you! Bonus: This collection helps fund @kempefoundation',242,'B07P8Y26QW','card://1148284623421677568'),(38,'Missing Halloween? Keep the haunted spirit going with NOPE, our horror-themed collection with 26 creepy stories and poems to keep your gooses bumped! All profits go to The Pilcrow Foundations, who stock rural libraries with hardcover children\'s books',251,'B07K1MZNCQ','card://1148285213040173057'),(39,'Would you take a hundred lives to save your own? Cadoc did, and now he must pay a blood debt to the gods. He returns home from a holy war, and finds the world he left behind in tatters. Can Cadoc reconcile his role in his family’s undoing?',240,'B07NT7CBG2','');
/*!40000 ALTER TABLE `tweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verbings`
--

DROP TABLE IF EXISTS `verbings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verbings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `verbing` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verbings`
--

LOCK TABLES `verbings` WRITE;
/*!40000 ALTER TABLE `verbings` DISABLE KEYS */;
INSERT INTO `verbings` VALUES (1,'fighting'),(2,'fucking'),(3,'mugging'),(4,'eating'),(5,'dabbing'),(6,'making a nice cup of tea'),(7,'eating breakfast'),(8,'chanting'),(9,'writing'),(10,'programming'),(11,'shitting'),(12,'shitposting'),(13,'damning'),(14,'cooking'),(15,'brining'),(16,'cleaning'),(17,'shooting'),(18,'smoking'),(19,'charging'),(20,'flushing'),(21,'hugging'),(22,'sliding'),(23,'reading'),(24,'walking'),(25,'texting'),(26,'struggling to speak'),(27,'mainlining a cup of coffee stronger than a moose in heat'),(28,'fishmongering'),(29,'kidnapping'),(30,'hooking'),(31,'drinking'),(32,'barebacking'),(33,'yiffing');
/*!40000 ALTER TABLE `verbings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-11 18:37:00
