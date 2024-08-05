-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-08-2024 a las 00:43:27
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ami_pets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adopciones`
--

CREATE TABLE `adopciones` (
  `id_adopcion` int NOT NULL,
  `fk_id_mascota` int NOT NULL,
  `fk_id_usuario_adoptante` int NOT NULL,
  `fecha_adopcion` date DEFAULT NULL,
  `estado` enum('aceptada','rechazada') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id_mascota` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `genero` enum('Macho','Hembra') COLLATE utf8mb4_general_ci NOT NULL,
  `raza` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `edad` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `discapacidad` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `trato_especial` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `estado` enum('adoptar','adoptada','proceso adopcion') COLLATE utf8mb4_general_ci NOT NULL,
  `fk_id_usuario` int DEFAULT NULL,
  `esterilizacion` enum('si','no','no se') COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id_mascota`, `nombre`, `genero`, `raza`, `edad`, `img`, `descripcion`, `discapacidad`, `trato_especial`, `estado`, `fk_id_usuario`, `esterilizacion`) VALUES
(1, 'Chispitas', 'Macho', 'Criolla', '9 años', 'img-1722588125905-846937539.jpeg', 'Perrita gordita, tamaño pequeño color tigre.', 'askdasdk', 'asdasd', 'adoptar', 2, 'no'),
(2, 'Chispitas', 'Macho', 'asdasd', '12', 'img-1722626849816-499828000.jpg', 'adasd', 'asdasda', 'asdsad', 'adoptar', 2, 'si'),
(3, 'Chiribico', 'Macho', 'criolla', '2 años', 'img-1722579318428-514818045.jpeg', 'perro tamaño pequeño color blanco', '', '', 'adoptar', 2, 'si'),
(4, 'Chispitas', 'Macho', 'Criolla', '12 años', NULL, 'dada', 'asdasd', 'dsad', 'adoptar', 2, 'si'),
(5, 'Marcos', 'Hembra', 'Criolla', '12 meses', 'img-1722626220601-349505043.jpg', 'es un peludo con buenos gustos ', 'ninguna', 'ninguna', 'adoptada', 2, 'si'),
(6, 'Fox', 'Macho', 'criolla', '2 años', 'img-1722626942718-66316644.jpeg', 'es u perro amable disfruta de tomar el sol y es de color dorado ', '', '', 'adoptar', 2, 'si'),
(7, 'clorox', 'Macho', 'pastor aleman', '3 ', 'img-1722790982479-962040916.jpeg', 'ninguna', 'yamboro', 'dnajsd', 'adoptar', 1, NULL),
(8, 'clorox', 'Macho', 'pastor aleman', '3 ', NULL, 'ninguna', 'yamboro', 'dnajsd', 'adoptar', 1, NULL),
(9, 'clorox', 'Macho', 'pastor aleman', '3 ', NULL, 'ninguna', NULL, NULL, 'adoptar', 1, NULL),
(10, 'clorox', 'Macho', 'pastor aleman', '3 ', NULL, 'ninguna', NULL, NULL, 'adoptar', 1, NULL),
(11, 'clorox', 'Macho', 'pastor aleman', '3 ', NULL, 'ninguna', NULL, NULL, 'adoptar', 1, NULL),
(12, 'clorox', 'Macho', 'pastor aleman', '3 ', NULL, 'ninguna', NULL, NULL, 'adoptar', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `numero_cel` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `rol` enum('administrador','usuario') COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `identificacion`, `nombres`, `correo`, `numero_cel`, `password`, `rol`) VALUES
(1, 123, 'alejo ', 'alejo@gmail.com', '123', '12345', 'administrador'),
(2, 1084521745, 'Davis ', 'davis@gmail.com', '3205164817', '12345', 'usuario'),
(3, 122020, 'dani', 'pasajes@gmail.com', '32141223', '12345', 'usuario'),
(4, 12123, 'alejna', 'jose@gmail.com', '2312', '12345', 'usuario'),
(6, 1212, 'alejandad', 'alejopas@gmail.com', '312317', '123456', 'usuario'),
(8, 1212331, 'alejandro gonzales', 'alejandrogonzales@gmail.com', '2131321', '123456', 'usuario'),
(9, 96361787, 'Wilson martinez ', 'wilson@gmail.com', '321215461', '12345', 'usuario'),
(14, 123133, 'alejandeo', 'aelajd@gmail.com', '12313', '2312313', 'usuario'),
(15, 212, 'alejandad', 'asdlasd@gmail.com', '312312', '123456', 'usuario'),
(16, 2231233, 'asds', 'alejands@gmail.com', '21321313', '12313', 'usuario'),
(17, 1212, 'sdsad', 'qwq', '123212', '31232323', 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunas`
--

CREATE TABLE `vacunas` (
  `id_vacuna` int NOT NULL,
  `fk_id_mascota` int DEFAULT NULL,
  `fecha_vacuna` date NOT NULL,
  `nombre_vacuna` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fk_id_usuario` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacunas`
--

INSERT INTO `vacunas` (`id_vacuna`, `fk_id_mascota`, `fecha_vacuna`, `nombre_vacuna`, `fk_id_usuario`) VALUES
(1, 1, '1111-12-12', 'moquillo', NULL),
(2, 3, '2024-08-02', 'moquillo', NULL),
(3, 4, '2323-10-20', 'sadasd', NULL),
(4, 3, '2000-02-10', 'bhhub', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD PRIMARY KEY (`id_adopcion`),
  ADD KEY `fk_id_mascota` (`fk_id_mascota`),
  ADD KEY `fk_id_usuario_adoptante` (`fk_id_usuario_adoptante`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id_mascota`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD PRIMARY KEY (`id_vacuna`),
  ADD KEY `fk_id_mascota` (`fk_id_mascota`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  MODIFY `id_adopcion` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id_mascota` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id_vacuna` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD CONSTRAINT `adopciones_ibfk_1` FOREIGN KEY (`fk_id_mascota`) REFERENCES `mascotas` (`id_mascota`),
  ADD CONSTRAINT `adopciones_ibfk_2` FOREIGN KEY (`fk_id_usuario_adoptante`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD CONSTRAINT `vacunas_ibfk_1` FOREIGN KEY (`fk_id_mascota`) REFERENCES `mascotas` (`id_mascota`),
  ADD CONSTRAINT `vacunas_ibfk_2` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
