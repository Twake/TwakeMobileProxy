import {FastifyInstance, FastifyRequest} from "fastify";


import Channels, {ChannelsController} from './controller'
import {ChannelsTypes} from "./types";
import {
    channelsDeleteSchema,
    channelsGetSchema,
    channelsMembersPostSchema,
    channelsPostSchema,
    directGetSchema,
    channelsMembersGetSchema,
    channelsPutSchema, channelsInitSchema, channelsMembersDeleteSchema
} from "./schemas";
import Api from "../../common/twakeapi2";
import ChannelsService from "./service";
import UsersService from "../users/service";


export default function (fastify: FastifyInstance) {
    fastify.get('/channels', {schema: channelsGetSchema}, async (request) => new Channels(request).listPublic(request.query as ChannelsTypes.ChannelParameters))
    fastify.post('/channels', {schema: channelsPostSchema}, async (request) => new Channels(request).add(request.body as ChannelsTypes.AddRequest))

    fastify.get('/direct', {schema: directGetSchema}, async (request) => new Channels(request).listDirect((request.query as any).company_id))


    function ctrl(request: FastifyRequest) {
        const api = new Api(request.jwtToken)
        return new ChannelsController(new ChannelsService(api), new UsersService(api))
    }

    fastify.route({
        method: "GET",
        url: '/channels/members',
        schema: channelsMembersGetSchema,
        // preHandler: accessControl,
        // preValidation: [fastify.authenticate],
        handler: (request) => ctrl(request).getMembers(request as FastifyRequest<{ Querystring: ChannelsTypes.ChannelParameters }>)
    });


    fastify.route({
        method: "PUT",
        url: '/channels',
        schema: channelsPutSchema,
        // preHandler: accessControl,
        // preValidation: [fastify.authenticate],
        handler: (request) => ctrl(request).edit(request as FastifyRequest<{ Body: ChannelsTypes.UpdateRequest }>)

    });


    fastify.route({
        method: "DELETE",
        url: '/channels',
        schema: channelsDeleteSchema,
        // preHandler: accessControl,
        // preValidation: [fastify.authenticate],
        handler: (request) => ctrl(request).delete(request as FastifyRequest<{ Body: ChannelsTypes.ChannelParameters }>)
    });


    fastify.route({
        method: "GET",
        url: '/channels/init',
        schema: channelsInitSchema,
        // preHandler: accessControl,
        // preValidation: [fastify.authenticate],
        handler: (request) => ctrl(request).init(request as FastifyRequest<{ Querystring: ChannelsTypes.ChannelParameters }>)
    });

    fastify.route({
        method: "POST",
        url: '/channels/members',
        schema: channelsMembersPostSchema,
        // preHandler: accessControl,
        // preValidation: [fastify.authenticate],
        handler: (request) => ctrl(request).addMembers(request as FastifyRequest<{ Body: ChannelsTypes.ChangeMembersRequest }>)
    });

    fastify.route({
        method: "DELETE",
        url: '/channels/members',
        schema: channelsMembersDeleteSchema,
        // preHandler: accessControl,
        // preValidation: [fastify.authenticate],
        handler: (request) => ctrl(request).removeMembers(request as FastifyRequest<{ Body: ChannelsTypes.ChangeMembersRequest }>)
    });

}
