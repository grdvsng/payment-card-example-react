import { Router } from 'express'

import CardRouter   from './card';
import DonateRouter from './donate';


const router = Router( );

router.use( '/card'  , CardRouter   );
router.use( '/donate', DonateRouter );

export default router;