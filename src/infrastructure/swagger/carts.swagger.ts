/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del carrito
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID del producto
 *               quantity:
 *                 type: number
 *                 description: Cantidad del producto en el carrito
 */

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: API de gestión de carritos de compra
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Obtiene todos los carritos
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: Lista de carritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Obtiene un carrito por su ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Crea un nuevo carrito
 *     tags: [Carts]
 *     responses:
 *       201:
 *         description: Carrito creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /carts/{cid}/product/{pid}:
 *   post:
 *     summary: Agrega un producto al carrito
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Elimina un carrito
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */
