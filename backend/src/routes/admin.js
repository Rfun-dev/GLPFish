import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get(
  '/test',
  requireAuth,
  requireAdmin,
  async (req, res) => {
    res.json({
      success: true,
      message: 'Admin route works',
      user: req.user
    })
  }
)

export default router
