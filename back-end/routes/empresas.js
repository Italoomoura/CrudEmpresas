import express from "express";
import { getEmpresas, addEmpresa, updateEmpresa, deleteEmpresa, searchEmpresaByCNPJ } from "../controllers/empresa.js"

const router = express.Router();

router.get("/search/:cnpj", searchEmpresaByCNPJ);

router.get("/", getEmpresas);
router.post("/", addEmpresa);
router.put("/:id", updateEmpresa);
router.delete("/:id", deleteEmpresa);

export default router;