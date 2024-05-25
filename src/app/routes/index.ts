import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { RequestRoutes } from '../modules/Request/request.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/request',
        route: RequestRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;