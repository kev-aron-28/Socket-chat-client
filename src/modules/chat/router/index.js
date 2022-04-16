export default {
    name: 'chat',
    component: () => import('../layouts/ChatLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-chat',
            component: () => import('../views/NoChatSelected.vue'),
        },
        {
            path: ':id',
            name: 'chat-home',
            component: () => import('../views/Chat.vue'),
            props: (route) => {
                return { 
                    id: route.params.id
                }
            }
        },
        
    ]
}