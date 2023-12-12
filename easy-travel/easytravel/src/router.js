import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import FAQ from './views/FAQ.vue';
import Contacts from './views/Contacts.vue';
import SignUp from './views/SignUp.vue';
import LogIn from './views/LogIn.vue';
import AdminPage from './views/AdminPage.vue';
import OffersTable from './components/OffersTable.vue';
import UsersTable from './components/UsersTable.vue';
import OrdersTable from './components/OrdersTable.vue';
import CategoriesTable from './components/CategoriesTable.vue';
import LocationsTable from './components/LocationsTable.vue';
import Add from './views/Add.vue';
import AddUser from './components/AddUser.vue';
import AddOffer from './components/AddOffer.vue';
import AddOrder from './components/AddOrder.vue';
import AddCategory from './components/AddCategory.vue';
import AddLocation from './components/AddLocation.vue';
import Update from './views/Update.vue';
import UpdateUser from './components/UpdateUser.vue';
import UpdateOffer from './components/UpdateOffer.vue';
import UpdateOrder from './components/UpdateOrder.vue';
import UpdateCategory from './components/UpdateCategory.vue';
import UpdateLocation from './components/UpdateLocation.vue';
import Offers from './views/Offers.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/faq', component: FAQ },
    { path: '/contacts', component: Contacts },
    { path: '/signup', component: SignUp },
    { path: '/login', component: LogIn },
    {
        path: '/adminPage',
        component: AdminPage,
        children: [
            { path: 'offersTable', components: { adminPageTable: OffersTable } },
            { path: 'usersTable', components: { adminPageTable: UsersTable } },
            { path: 'ordersTable', components: { adminPageTable: OrdersTable } },
            { path: 'categoriesTable', components: { adminPageTable: CategoriesTable } },
            { path: 'locationsTable', components: { adminPageTable: LocationsTable } },
        ],
    },

    {
        path: '/add',
        component: Add,
        children: [
            { path: 'user', components: { addComp: AddUser } },
            { path: 'offer', components: { addComp: AddOffer } },
            { path: 'order', components: { addComp: AddOrder } },
            { path: 'category', components: { addComp: AddCategory } },
            { path: 'location', components: { addComp: AddLocation } },
        ],
    },
    {
        path: '/update',
        component: Update,
        children: [
            {
                path: 'user/:id',
                components: {
                    updateComp: UpdateUser,
                },
                props: {
                    updateComp: route => ({ id: route.params.id }),
                },
            },
            {
                path: 'offer/:id',
                components: {
                    updateComp: UpdateOffer,
                },
                props: {
                    updateComp: route => ({ id: route.params.id }),
                },
            },
            {
                path: 'order/:id',
                components: {
                    updateComp: UpdateOrder,
                },
                props: {
                    updateComp: route => ({ id: route.params.id }),
                },
            },
            {
                path: 'category/:id',
                components: {
                    updateComp: UpdateCategory,
                },
                props: {
                    updateComp: route => ({ id: route.params.id }),
                },
            },
            {
                path: 'location/:id',
                components: {
                    updateComp: UpdateLocation,
                },
                props: {
                    updateComp: route => ({ id: route.params.id }),
                },
            }
        ],
    },
    { path: '/offers/:categoryName?', component: Offers }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;