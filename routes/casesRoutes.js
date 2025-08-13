const express = require("express");
const router = express.Router();
const controller = require("../controllers/casesController");

/**
 * @swagger
 * tags:
 *   - name: Casos
 *     description: Gerenciamento de todos os casos do departamento de polícia
 */

/**
 * @swagger
 * /cases:
 *   get:
 *     summary: Lista de todos os casos
 *     tags: ['Casos']
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 */

router.get("/", controller.getCases);

/**
 * @swagger
 * /cases:
 *   post:
 *     summary: Criar um novo caso
 *     tags: ['Casos']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, descricao, status, idAgente]
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *               idAgente:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 */
router.post("/", controller.createCase);

/**
 * @swagger
 * /cases/{id}:
 *   put:
 *     summary: Atualizar um caso existente
 *     tags: ['Casos']
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, descricao, status, idAgente]
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *               idAgente:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.put("/:id", controller.updateCase);

/**
 * @swagger
 * /cases/{id}:
 *   delete:
 *     summary: Remover um caso a partir do ID
 *     tags: ['Casos']
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso deletado com sucesso
 *       404:
 *         description: Caso não encontrado
 */

router.delete("/:id", controller.deletedCase);

module.exports = router;
