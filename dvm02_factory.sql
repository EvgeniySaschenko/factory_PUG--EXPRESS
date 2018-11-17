-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Хост: dvm02.mysql.ukraine.com.ua
-- Время создания: Ноя 17 2018 г., 00:35
-- Версия сервера: 5.7.16-10-log
-- Версия PHP: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dvm02_factory`
--

-- --------------------------------------------------------

--
-- Структура таблицы `ff_division`
--

CREATE TABLE `ff_division` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_division`
--

INSERT INTO `ff_division` (`id`, `id_visitor_create`, `id_visitor_update`, `name`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 1, 1, 'Технологи', '2018-11-06 17:20:05', '0000-00-00 00:00:00', '', 0, 0),
(2, 1, 0, 'Цех', '2018-11-06 17:20:12', '0000-00-00 00:00:00', '', 0, 0),
(3, 1, 1, 'Бухгалтерия', '2018-11-06 17:20:20', '0000-00-00 00:00:00', '', 0, 0),
(4, 1, 1, 'sadsa', '2018-11-08 22:54:55', '0000-00-00 00:00:00', 'fsfdsf', 0, 1),
(5, 1, 0, 'sd', '2018-11-08 22:54:59', '0000-00-00 00:00:00', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_doc_automat_map`
--

CREATE TABLE `ff_doc_automat_map` (
  `id` int(11) NOT NULL,
  `id_rout_map_item` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `id_equipment` int(11) NOT NULL,
  `firmness` varchar(255) NOT NULL,
  `ev` varchar(255) NOT NULL,
  `md` varchar(255) NOT NULL,
  `profile` varchar(255) NOT NULL,
  `mz` varchar(255) NOT NULL,
  `koi` varchar(255) NOT NULL,
  `program` varchar(255) NOT NULL,
  `t_o` varchar(255) NOT NULL,
  `t_v` varchar(255) NOT NULL,
  `t_pz` varchar(255) NOT NULL,
  `t_st` varchar(255) NOT NULL,
  `emulsion` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `approve_1` json NOT NULL,
  `approve_2` json NOT NULL,
  `approve_3` json NOT NULL,
  `approve_4` json NOT NULL,
  `approve_5` json NOT NULL,
  `approve_6` json NOT NULL,
  `approve_7` json NOT NULL,
  `approve_8` json NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_doc_automat_map`
--

INSERT INTO `ff_doc_automat_map` (`id`, `id_rout_map_item`, `id_visitor_create`, `id_visitor_update`, `id_equipment`, `firmness`, `ev`, `md`, `profile`, `mz`, `koi`, `program`, `t_o`, `t_v`, `t_pz`, `t_st`, `emulsion`, `date_create`, `date_update`, `approve_1`, `approve_2`, `approve_3`, `approve_4`, `approve_5`, `approve_6`, `approve_7`, `approve_8`, `remark`, `status`, `del`) VALUES
(1, 1, 1, 1, 1, '333firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:29:25', '0000-00-00 00:00:00', '{\"approve_1\": \"1\"}', '{\"approve_1\": \"1\"}', '{\"approve_1\": \"1\"}', '{\"approve_1\": \"1\"}', '{\"approve_1\": \"1\"}', '{\"approve_1\": \"1\"}', '{\"approve_1\": \"1\"}', '{\"approve_1\": \"1\"}', '', 0, 0),
(2, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:29:28', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(3, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:29:31', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(4, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:29:33', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(5, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:29:35', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(6, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:31:14', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(7, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:35:03', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(8, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:35:07', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(9, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:35:09', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(10, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:38:50', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0),
(11, 2, 1, 0, 2, 'firmness', 'ev', 'md', 'profile', 'mz', 'koi', 'program', 't_o', 't_v', 't_pz', 't_st', 'emulsion', '2018-10-14 19:58:39', '0000-00-00 00:00:00', '{\"approve_2\": \"1\"}', '{\"approve_1\": \"2\"}', '{\"approve_1\": \"3\"}', '{\"approve_1\": \"4\"}', '{\"approve_1\": \"5\"}', '{\"approve_1\": \"6\"}', '{\"approve_1\": \"7\"}', '{\"approve_1\": \"8\"}', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_doc_automat_map_item`
--

CREATE TABLE `ff_doc_automat_map_item` (
  `id` int(11) NOT NULL,
  `id_automat_map` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pi` varchar(255) NOT NULL,
  `d_v` varchar(255) NOT NULL,
  `l` varchar(255) NOT NULL,
  `t` varchar(255) NOT NULL,
  `i` varchar(255) NOT NULL,
  `s` varchar(255) NOT NULL,
  `n` varchar(255) NOT NULL,
  `v` varchar(255) NOT NULL,
  `t_o` varchar(255) NOT NULL,
  `t_v` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_doc_automat_map_item`
--

INSERT INTO `ff_doc_automat_map_item` (`id`, `id_automat_map`, `id_visitor_create`, `id_visitor_update`, `name`, `pi`, `d_v`, `l`, `t`, `i`, `s`, `n`, `v`, `t_o`, `t_v`, `date_create`, `date_update`, `del`) VALUES
(1, 1, 1, 1, 'name', 'pi55554', 'd_v', 'l', 't', 'i', 's', 'n', 'v', 't_o', 't_v', '2018-10-14 19:59:36', '0000-00-00 00:00:00', 0),
(2, 1, 1, 0, 'name', 'pi', 'd_v', 'l', 't', 'i', 's', 'n', 'v', 't_o', 't_v', '2018-10-14 19:59:38', '0000-00-00 00:00:00', 0),
(3, 1, 1, 0, 'name', 'pi', 'd_v', 'l', 't', 'i', 's', 'n', 'v', 't_o', 't_v', '2018-10-14 19:59:40', '0000-00-00 00:00:00', 0),
(4, 1, 1, 0, 'name', 'pi', 'd_v', 'l', 't', 'i', 's', 'n', 'v', 't_o', 't_v', '2018-10-14 19:59:41', '0000-00-00 00:00:00', 0),
(5, 1, 1, 0, 'name', 'pi', 'd_v', 'l', 't', 'i', 's', 'n', 'v', 't_o', 't_v', '2018-10-14 19:59:42', '0000-00-00 00:00:00', 0),
(6, 1, 1, 0, 'name', 'pi', 'd_v', 'l', 't', 'i', 's', 'n', 'v', 't_o', 't_v', '2018-10-14 19:59:44', '0000-00-00 00:00:00', 0),
(7, 1, 1, 0, 'name', 'pi', 'd_v', 'l', 't', 'i', 's', 'n', 'v', 't_o', 't_v', '2018-10-14 20:11:18', '0000-00-00 00:00:00', 0),
(8, 1, 1, 0, 'name', 'pi', 'd_v', 'l', 't', 'i', 's', 'n', 'v', 't_o', 't_v', '2018-10-14 20:14:26', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_doc_rout_map`
--

CREATE TABLE `ff_doc_rout_map` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `id_material` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `num_detail` varchar(255) NOT NULL,
  `weight` float NOT NULL,
  `units_measure` varchar(4) NOT NULL,
  `size_d` float NOT NULL,
  `size_w` float NOT NULL,
  `type_ingot` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `approve_1` json NOT NULL,
  `approve_2` json NOT NULL,
  `approve_3` json NOT NULL,
  `approve_4` json NOT NULL,
  `approve_5` json NOT NULL,
  `approve_6` json NOT NULL,
  `approve_7` json NOT NULL,
  `approve_8` json NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_doc_rout_map`
--

INSERT INTO `ff_doc_rout_map` (`id`, `id_visitor_create`, `id_visitor_update`, `id_material`, `name`, `num_detail`, `weight`, `units_measure`, `size_d`, `size_w`, `type_ingot`, `date_create`, `date_update`, `approve_1`, `approve_2`, `approve_3`, `approve_4`, `approve_5`, `approve_6`, `approve_7`, `approve_8`, `remark`, `status`, `del`) VALUES
(12, 1, 0, 8, 'asdasd', '323.131312.3213.123', 22, '3', 55, 555, '0', '2018-11-15 02:55:01', '0000-00-00 00:00:00', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'erwreqrwerer', 1, 0),
(11, 1, 0, 8, 'asdasd', '323.131312.3213.123', 22, '3', 55, 555, '0', '2018-11-15 02:23:07', '0000-00-00 00:00:00', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'erwreqrwerer', 1, 0),
(10, 1, 0, 8, 'asdasd', '323.131312.3213.123', 22, '3', 55, 555, '0', '2018-11-15 02:22:38', '0000-00-00 00:00:00', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'erwreqrwerer', 0, 0),
(13, 1, 0, 4, 'fasfsd', 'sadfsdfsdfa', 34343, '3', 343, 3434, 'Пруток', '2018-11-15 03:03:25', '0000-00-00 00:00:00', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '3433443343', 0, 0),
(14, 1, 0, 4, 'Колесо', '3231313123213124', 5454, '3', 45, 45, 'Пруток', '2018-11-16 22:19:17', '0000-00-00 00:00:00', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_doc_rout_map_item`
--

CREATE TABLE `ff_doc_rout_map_item` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `id_rout_map` int(11) NOT NULL,
  `id_material` int(11) NOT NULL,
  `id_rank` int(11) NOT NULL,
  `num_shop` varchar(255) NOT NULL,
  `num_area` varchar(255) NOT NULL,
  `rm` varchar(255) NOT NULL,
  `num_operation` varchar(255) NOT NULL,
  `sm` varchar(255) NOT NULL,
  `rank_level` varchar(255) NOT NULL,
  `ut` varchar(255) NOT NULL,
  `kr` varchar(255) NOT NULL,
  `koid` varchar(255) NOT NULL,
  `en` varchar(255) NOT NULL,
  `op` varchar(255) NOT NULL,
  `kst` varchar(255) NOT NULL,
  `tpz` varchar(255) NOT NULL,
  `tst` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_doc_rout_map_item`
--

INSERT INTO `ff_doc_rout_map_item` (`id`, `id_visitor_create`, `id_visitor_update`, `id_rout_map`, `id_material`, `id_rank`, `num_shop`, `num_area`, `rm`, `num_operation`, `sm`, `rank_level`, `ut`, `kr`, `koid`, `en`, `op`, `kst`, `tpz`, `tst`, `date_create`, `date_update`, `del`) VALUES
(1, 1, 1, 2, 3, 4, '555num_shop', 'num_area', 'rm', 'num_operation', 'sm', 'rank_level', 'ut', 'kr', 'koid', 'en', 'op', 'kst', 'tpz', 'tst', '2018-10-13 23:53:49', '0000-00-00 00:00:00', 0),
(2, 1, 0, 2, 3, 4, 'num_shop', 'num_area', 'rm', 'num_operation', 'sm', 'rank_level', 'ut', 'kr', 'koid', 'en', 'op', 'kst', 'tpz', 'tst', '2018-10-13 23:53:52', '0000-00-00 00:00:00', 0),
(3, 1, 0, 2, 3, 4, 'num_shop', 'num_area', 'rm', 'num_operation', 'sm', 'rank_level', 'ut', 'kr', 'koid', 'en', 'op', 'kst', 'tpz', 'tst', '2018-10-13 23:53:56', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_equipment`
--

CREATE TABLE `ff_equipment` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `num` int(11) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_equipment`
--

INSERT INTO `ff_equipment` (`id`, `id_visitor_create`, `id_visitor_update`, `name`, `model`, `num`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 1, 1, 'name qwq ', 'wq', 1, '2018-10-13 14:38:43', '0000-00-00 00:00:00', '0', 1, 0),
(2, 1, 1, '122112', 'чсясчя', 2, '2018-10-13 14:38:52', '0000-00-00 00:00:00', '0', 1, 1),
(3, 1, 1, 'name', 'model6666', 3, '2018-10-13 14:38:57', '0000-00-00 00:00:00', '0', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_global_settings`
--

CREATE TABLE `ff_global_settings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `priority` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_global_settings`
--

INSERT INTO `ff_global_settings` (`id`, `name`, `type`, `priority`) VALUES
(1, 'Продукция', 'material_use', 1),
(2, 'Инструмент', 'material_use', 2),
(3, 'кг', 'units_measure', 1),
(4, 'т', 'units_measure', 2),
(5, 'Пруток', 'type_ingot', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_material`
--

CREATE TABLE `ff_material` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `id_type` int(11) NOT NULL,
  `id_use` int(11) NOT NULL,
  `mark` varchar(255) NOT NULL,
  `standart` text NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_material`
--

INSERT INTO `ff_material` (`id`, `id_visitor_create`, `id_visitor_update`, `id_type`, `id_use`, `mark`, `standart`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 1, 1, 1, 2, 'ф12апв', 'ввыfsdfdsfапавпав', '2018-11-12 18:37:48', '0000-00-00 00:00:00', '', 1, 0),
(2, 1, 1, 1, 1, 'ф13', 'ГОСТ / ТУ 55555555555555555', '2018-11-12 18:38:02', '0000-00-00 00:00:00', '$$$$', 1, 1),
(3, 1, 1, 1, 2, 'ф13aa', 'ввыfsdfdsf', '2018-11-12 18:38:16', '0000-00-00 00:00:00', 'gdfgterge', 1, 0),
(4, 1, 0, 1, 1, '11ф13aa', 'ввыfsdfdsf', '2018-11-12 18:38:37', '0000-00-00 00:00:00', '', 0, 0),
(5, 1, 0, 1, 1, 'Ч55', 'ГОСТ 24168-80', '2018-11-14 23:56:38', '0000-00-00 00:00:00', '', 0, 0),
(6, 1, 0, 1, 1, 'Ч56', 'ГОСТ 24168-80', '2018-11-14 23:56:45', '0000-00-00 00:00:00', '', 0, 0),
(7, 1, 0, 1, 1, 'Ч57', 'ГОСТ 24168-80', '2018-11-14 23:56:55', '0000-00-00 00:00:00', '', 0, 0),
(8, 1, 0, 2, 1, 'У333', 'ГОСТ 24168-80', '2018-11-14 23:57:50', '0000-00-00 00:00:00', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_material_type`
--

CREATE TABLE `ff_material_type` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_material_type`
--

INSERT INTO `ff_material_type` (`id`, `id_visitor_create`, `id_visitor_update`, `name`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 1, 0, 'Сталь', '2018-11-12 18:37:27', '0000-00-00 00:00:00', '', 0, 0),
(2, 1, 0, 'Чугун', '2018-11-14 23:55:22', '0000-00-00 00:00:00', '', 0, 0),
(3, 1, 1, 'Evgeniy Saschenko', '2018-11-15 03:32:42', '0000-00-00 00:00:00', 'У Києві 27 жовтня з 13:00 до 17:00 в Національному культурно-художньому комплексі «Мистецький Арсенал» (вул. Лаврська 10-12) пройде п’ятий ювілейний фестиваль культур народів світу OUTLOOK WORLD CULTURE FESTIVAL, який представить у різних проявах культуру понад 30 країн світу за участі посольств іноземних держав і діаспор. Фестиваль щорічно організовує проект OUTLOOK (theoutlook.com.ua), який працює у сфері медіа та культурної дипломатії. Цього року захід пройде за підтримки Українського культурного фонду. ', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_nav`
--

CREATE TABLE `ff_nav` (
  `id` int(11) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `priority` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_nav`
--

INSERT INTO `ff_nav` (`id`, `id_parent`, `name`, `link`, `type`, `priority`, `del`) VALUES
(1, 0, 'Админ панель', '/admin', 'main', 1, 0),
(2, 0, 'Тех. процессы', '/tech-process', 'main', 2, 0),
(3, 1, 'Пользователи', '/admin/user', 'admin', 2, 0),
(4, 1, 'Подразделения', '/admin/division', 'admin', 1, 0),
(5, 1, 'Материалы', '/admin/material', 'admin', 3, 0),
(6, 1, 'Тех. процессы', '/admin/tech-process', 'admin', 6, 0),
(7, 1, 'Инструмент', '/admin/tool', 'admin', 4, 1),
(8, 1, 'Оборудование', '/admin/equipment', 'admin', 5, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_operation`
--

CREATE TABLE `ff_operation` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_operation`
--

INSERT INTO `ff_operation` (`id`, `id_visitor_create`, `id_visitor_update`, `name`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 1, 1, 'nameadasAWQEWQEQW', '2018-10-13 12:54:33', '0000-00-00 00:00:00', '', 0, 0),
(2, 1, 0, 'name22', '2018-10-13 12:55:09', '0000-00-00 00:00:00', '', 0, 0),
(3, 1, 0, 'укеуеукцxxczzxc', '2018-11-09 01:00:26', '0000-00-00 00:00:00', '', 0, 0),
(4, 1, 1, 'cxzcxzcxzasdasd', '2018-11-09 01:00:29', '0000-00-00 00:00:00', '', 1, 1),
(5, 1, 1, 'cxzcxz', '2018-11-09 01:00:41', '0000-00-00 00:00:00', 'sdfsfsda', 1, 1),
(6, 1, 1, 'grgrasg', '2018-11-09 13:32:08', '0000-00-00 00:00:00', '', 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_rank`
--

CREATE TABLE `ff_rank` (
  `id` int(11) NOT NULL,
  `id_division` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_rank`
--

INSERT INTO `ff_rank` (`id`, `id_division`, `id_visitor_create`, `id_visitor_update`, `name`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 1, 1, 1, 'namrrtrtrte', '2018-10-06 16:07:48', '0000-00-00 00:00:00', '', 0, 0),
(2, 1, 1, 6, 'name1', '2018-10-11 00:07:41', '0000-00-00 00:00:00', '', 0, 0),
(3, 1, 1, 1, '12вавав3sdfsdasad', '2018-10-11 00:07:58', '0000-00-00 00:00:00', '', 0, 0),
(4, 1, 1, 1, '12вавав3вавыавы', '2018-10-11 00:10:45', '0000-00-00 00:00:00', '', 0, 1),
(5, 1, 1, 6, 'name1', '2018-10-11 00:23:32', '0000-00-00 00:00:00', '', 0, 0),
(6, 1, 1, 0, '12вавав3', '2018-10-11 00:25:03', '0000-00-00 00:00:00', '', 0, 0),
(7, 1, 1, 0, '12вавав3', '2018-10-11 00:34:08', '0000-00-00 00:00:00', '', 0, 0),
(8, 2, 1, 0, 'name', '2018-10-13 01:35:04', '0000-00-00 00:00:00', '', 0, 0),
(9, 1, 1, 1, 'парапрапsasdsad', '2018-11-07 02:31:57', '0000-00-00 00:00:00', 'dfsafdsaf', 0, 0),
(10, 1, 1, 0, 'vxcvcxv', '2018-11-07 02:32:09', '0000-00-00 00:00:00', '', 0, 0),
(11, 1, 1, 0, 'fdsf', '2018-11-08 15:12:07', '0000-00-00 00:00:00', '', 0, 0),
(12, 0, 1, 1, 'fgag', '2018-11-08 20:10:35', '0000-00-00 00:00:00', '', 1, 1),
(13, 3, 1, 0, '12вавав3', '2018-11-09 01:54:24', '0000-00-00 00:00:00', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_tool`
--

CREATE TABLE `ff_tool` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `id_material` int(11) NOT NULL,
  `id_type` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `standart` text NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_tool`
--

INSERT INTO `ff_tool` (`id`, `id_visitor_create`, `id_visitor_update`, `id_material`, `id_type`, `description`, `standart`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 5, 1, 1, 1, '1', '31', '2018-10-11 02:38:54', '0000-00-00 00:00:00', '', 0, 0),
(2, 5, 0, 5, 5, 'name', 'standart', '2018-10-11 02:38:58', '0000-00-00 00:00:00', '', 0, 0),
(3, 5, 2, 4, 5, 'name88', 'standart888', '2018-10-11 14:35:08', '0000-00-00 00:00:00', '', 0, 0),
(4, 5, 0, 5, 5, 'name', 'standart', '2018-10-11 14:54:38', '0000-00-00 00:00:00', '', 0, 0),
(5, 5, 0, 5, 5, 'name', 'standart', '2018-10-11 14:54:59', '0000-00-00 00:00:00', '', 0, 0),
(6, 5, 0, 5, 5, 'name', 'standart', '2018-10-11 14:56:34', '0000-00-00 00:00:00', '', 0, 0),
(7, 5, 0, 5, 5, 'name', 'standart', '2018-10-11 14:56:58', '0000-00-00 00:00:00', '', 0, 0),
(8, 1, 0, 1, 1, '1', '1', '2018-10-13 01:05:18', '0000-00-00 00:00:00', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_tool_type`
--

CREATE TABLE `ff_tool_type` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_tool_type`
--

INSERT INTO `ff_tool_type` (`id`, `id_visitor_create`, `id_visitor_update`, `name`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 1, 1, '12', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 0, 0),
(2, 1, 0, 'name', '0000-00-00 00:00:00', '2018-10-11 01:55:05', '', 0, 0),
(3, 1, 2, '888888888', '0000-00-00 00:00:00', '2018-10-11 02:38:19', '', 0, 0),
(4, 1, 0, 'name', '0000-00-00 00:00:00', '2018-10-11 02:06:48', '', 0, 0),
(5, 1, 0, '1', '2018-10-13 00:48:16', '0000-00-00 00:00:00', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_user`
--

CREATE TABLE `ff_user` (
  `id` int(11) NOT NULL,
  `id_visitor_create` int(11) NOT NULL,
  `id_visitor_update` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `pass` varchar(32) NOT NULL,
  `rank` json NOT NULL,
  `name` json NOT NULL,
  `date_birth` date NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime NOT NULL,
  `remark` text NOT NULL,
  `status` int(11) NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_user`
--

INSERT INTO `ff_user` (`id`, `id_visitor_create`, `id_visitor_update`, `login`, `pass`, `rank`, `name`, `date_birth`, `date_create`, `date_update`, `remark`, `status`, `del`) VALUES
(1, 1, 0, '', '', '{\"rank\": \"111\"}', '{\"name\": \"111\"}', '1990-01-01', '2018-10-07 15:41:34', '0000-00-00 00:00:00', '', 0, 0),
(2, 1, 0, 'admin', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-07 20:05:22', '0000-00-00 00:00:00', '', 0, 0),
(3, 1, 0, 'admin2', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-07 20:06:02', '0000-00-00 00:00:00', '', 0, 0),
(4, 1, 0, 'admin5', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 15:35:04', '0000-00-00 00:00:00', '', 0, 0),
(5, 1, 0, 'admin6', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 15:43:25', '0000-00-00 00:00:00', '', 0, 0),
(6, 1, 0, 'admin7', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 15:44:55', '0000-00-00 00:00:00', '', 0, 0),
(7, 1, 0, 'admin8', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 16:45:24', '0000-00-00 00:00:00', '', 0, 0),
(8, 1, 0, 'admin9', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 17:24:48', '0000-00-00 00:00:00', '', 0, 0),
(9, 1, 0, 'admin10', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 17:27:26', '0000-00-00 00:00:00', '', 0, 0),
(10, 1, 0, 'admin11', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 17:28:52', '0000-00-00 00:00:00', '', 0, 0),
(11, 1, 0, 'admin12', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 17:30:33', '0000-00-00 00:00:00', '', 0, 0),
(12, 1, 0, 'admin13', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 17:32:14', '0000-00-00 00:00:00', '', 0, 0),
(13, 1, 0, 'admin14', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 17:34:03', '0000-00-00 00:00:00', '', 0, 0),
(14, 1, 0, 'admin15', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 17:34:08', '0000-00-00 00:00:00', '', 0, 0),
(15, 1, 0, 'admin16', '123', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 17:37:33', '0000-00-00 00:00:00', '', 0, 0),
(16, 1, 0, 'admin17', '3137844e19c507bcc842f0877fb257bd', '{\"rank\": \"Admin\", \"level\": \"0\"}', '{\"name\": \"Evgeniy\", \"lastName\": \"Saschenko\", \"middleName\": \"Vitalievich\"}', '1990-01-01', '2018-10-08 20:09:55', '0000-00-00 00:00:00', '', 0, 0),
(17, 1, 0, 'login444433', '4d99065339e8c07efd54e302de837485', '[]', '\"name\"', '1990-01-01', '2018-10-17 13:44:24', '0000-00-00 00:00:00', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ff_user_visitor`
--

CREATE TABLE `ff_user_visitor` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `user_agent` json NOT NULL,
  `date_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ff_user_visitor`
--

INSERT INTO `ff_user_visitor` (`id`, `id_user`, `ip`, `user_agent`, `date_create`) VALUES
(1, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:37:37'),
(2, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:44:51'),
(3, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:47:39'),
(4, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:49:26'),
(5, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:49:40'),
(6, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:49:57'),
(7, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:50:08'),
(8, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:52:02'),
(9, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:52:21'),
(10, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:52:34'),
(11, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:52:52'),
(12, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:53:04'),
(13, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:53:19'),
(14, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 19:54:30'),
(15, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 20:17:45'),
(16, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 20:34:51'),
(17, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 20:35:52'),
(18, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 20:36:06'),
(19, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 20:36:27'),
(20, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 20:38:19'),
(21, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 20:38:57'),
(22, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 20:39:32'),
(23, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:10:21'),
(24, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:10:53'),
(25, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:14:54'),
(26, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:15:55'),
(27, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:16:32'),
(28, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:17:52'),
(29, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:19:16'),
(30, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:20:06'),
(31, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-10 21:21:09'),
(32, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-12 21:44:33'),
(33, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 15:53:48'),
(34, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 15:55:16'),
(35, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 16:01:22'),
(36, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 18:32:56'),
(37, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 18:33:53'),
(38, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 18:34:07'),
(39, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 19:51:37'),
(40, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 19:52:44'),
(41, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 19:54:23'),
(42, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 19:54:52'),
(43, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 19:54:53'),
(44, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 19:54:53'),
(45, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 19:54:54'),
(46, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 19:55:51'),
(47, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 20:00:43'),
(48, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 20:00:45'),
(49, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 20:01:00'),
(50, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 20:11:43'),
(51, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 20:12:03'),
(52, 16, '::1', '{\"os\": \"Windows 10.0\", \"browser\": \"Chrome\", \"version\": \"69.0.3497.100\", \"platform\": \"Microsoft Windows\"}', '2018-10-17 20:12:37');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `ff_division`
--
ALTER TABLE `ff_division`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_doc_automat_map`
--
ALTER TABLE `ff_doc_automat_map`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_doc_automat_map_item`
--
ALTER TABLE `ff_doc_automat_map_item`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_doc_rout_map`
--
ALTER TABLE `ff_doc_rout_map`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_doc_rout_map_item`
--
ALTER TABLE `ff_doc_rout_map_item`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_equipment`
--
ALTER TABLE `ff_equipment`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_global_settings`
--
ALTER TABLE `ff_global_settings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_material`
--
ALTER TABLE `ff_material`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_material_type`
--
ALTER TABLE `ff_material_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_nav`
--
ALTER TABLE `ff_nav`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_operation`
--
ALTER TABLE `ff_operation`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_rank`
--
ALTER TABLE `ff_rank`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_tool`
--
ALTER TABLE `ff_tool`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_tool_type`
--
ALTER TABLE `ff_tool_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ff_user`
--
ALTER TABLE `ff_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- Индексы таблицы `ff_user_visitor`
--
ALTER TABLE `ff_user_visitor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `ff_division`
--
ALTER TABLE `ff_division`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `ff_doc_automat_map`
--
ALTER TABLE `ff_doc_automat_map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `ff_doc_automat_map_item`
--
ALTER TABLE `ff_doc_automat_map_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `ff_doc_rout_map`
--
ALTER TABLE `ff_doc_rout_map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `ff_doc_rout_map_item`
--
ALTER TABLE `ff_doc_rout_map_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `ff_equipment`
--
ALTER TABLE `ff_equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `ff_global_settings`
--
ALTER TABLE `ff_global_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `ff_material`
--
ALTER TABLE `ff_material`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `ff_material_type`
--
ALTER TABLE `ff_material_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `ff_nav`
--
ALTER TABLE `ff_nav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `ff_operation`
--
ALTER TABLE `ff_operation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `ff_rank`
--
ALTER TABLE `ff_rank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `ff_tool`
--
ALTER TABLE `ff_tool`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `ff_tool_type`
--
ALTER TABLE `ff_tool_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `ff_user`
--
ALTER TABLE `ff_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `ff_user_visitor`
--
ALTER TABLE `ff_user_visitor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
