/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 100406
 Source Host           : localhost:3306
 Source Schema         : qr_rally

 Target Server Type    : MySQL
 Target Server Version : 100406
 File Encoding         : 65001

 Date: 22/04/2021 04:31:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_event
-- ----------------------------
DROP TABLE IF EXISTS `tbl_event`;
CREATE TABLE `tbl_event`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `created_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `input_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qr_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_event
-- ----------------------------
INSERT INTO `tbl_event` VALUES (1, 'Start Event', 'ASAdcasdcdsfvsdfv', '0000-00-00', '0000-00-00', '2021-04-18 01:57:46', 'This', '1.png', '3.jpg');
INSERT INTO `tbl_event` VALUES (3, 'hhgg', 'hg', '0000-00-00', '0000-00-00', '2021-04-20 04:28:28', 'hghg', '3.png', '31.jpg');
INSERT INTO `tbl_event` VALUES (7, 'efvdfv', 'efgv', '0000-00-00', '0000-00-00', '2021-04-21 03:22:15', 'efv', '7.png', '7.jpg');
INSERT INTO `tbl_event` VALUES (6, 'test Event', 'jhgbkjugvkjh', '0000-00-00', '0000-00-00', '2021-04-21 03:23:14', 'sdafedf', '6.png', '6.jpg');
INSERT INTO `tbl_event` VALUES (8, 'dsfvsdf', 'wefdwer', '0000-00-00', '0000-00-00', '2021-04-21 03:23:16', 'asfdevdsf', '8.png', '8.jpg');

-- ----------------------------
-- Table structure for tbl_files
-- ----------------------------
DROP TABLE IF EXISTS `tbl_files`;
CREATE TABLE `tbl_files`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img_2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `position` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `event_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_files
-- ----------------------------
INSERT INTO `tbl_files` VALUES (1, '1.jpg', '1_1.jpg', '[[45,31],[185,48],[300,180]]', 1);
INSERT INTO `tbl_files` VALUES (3, '3.jpg', '3_1.jpg', '[[57,24],[183,45],[296,180]]', 1);
INSERT INTO `tbl_files` VALUES (4, '4.jpg', '4_1.jpg', '[[58,22],[182,46],[291,180]]', 1);
INSERT INTO `tbl_files` VALUES (5, '5.jpg', '5_1.jpg', '[[60,24],[184,42],[292,181]]', 1);
INSERT INTO `tbl_files` VALUES (6, '6.jpg', '6_1.jpg', '[[57,26],[181,45],[293,177]]', 1);
INSERT INTO `tbl_files` VALUES (7, '7.jpg', '7_1.jpg', '[[7,8],[10,221],[298,222]]', 3);
INSERT INTO `tbl_files` VALUES (8, '8.jpg', '8_1.jpg', '[[9,7],[6,220],[298,217]]', 3);
INSERT INTO `tbl_files` VALUES (9, '9.jpg', '9_1.jpg', '[[4,3],[6,218],[311,210]]', 3);
INSERT INTO `tbl_files` VALUES (10, '10.jpg', '10_1.jpg', '[[6,6],[6,221],[299,215]]', 3);
INSERT INTO `tbl_files` VALUES (11, '11.jpg', '11_1.jpg', '[[6,6],[8,221],[303,213]]', 3);

SET FOREIGN_KEY_CHECKS = 1;
