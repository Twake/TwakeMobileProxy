export declare namespace ChannelsTypes {

    type DirectChannel = "direct";

    export interface BaseChannelsParameters {
        company_id: string;
        workspace_id: string;
    }

    export interface PublicChannelsListParameters extends BaseChannelsParameters {
        all: boolean
    }

    export interface ChannelParameters extends BaseChannelsParameters {
        id: string | DirectChannel
    }


    export interface Channel {
        id: string
        name: string
        icon: string
        description: string
        channel_group: string
        workspace_id: string | null
        last_activity: number
        user_last_access: number
        company_id: string
        visibility: string,
        members: [],
        is_member: boolean
    }


    export interface AddRequest extends BaseChannelsParameters {
        name: string
        icon: string
        description: string
        channel_group: string
        is_default: boolean
        visibility: string
        members: string[]
    }

    export interface AddDirectRequest extends BaseChannelsParameters {
        member: string
    }


    export interface ChangeMembersRequest extends ChannelParameters {
        members: string[]
    }

    export interface UpdateRequest extends ChannelParameters {
        name: string,
        description: string,
        icon: string,
        visibility: string,
        is_default: boolean
    }
}
