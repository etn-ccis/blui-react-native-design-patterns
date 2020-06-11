import { Home } from "../screens/Home";
import { Placeholder } from "../screens/Placeholder";


export type ROUTE = {
    title: string;
    location: string;
    screen?: React.ComponentType;
    items?: ROUTE_OBJECT;
}
type ROUTE_OBJECT = {
    [key: string]: ROUTE;
}
export const ROUTES: ROUTE_OBJECT = {
    HOME: { title: 'Home', location: 'home', screen: Home },
    APPBAR: {
        title: 'App Bar',
        location: 'app-bar',
        items: {
            COLLAPSIBLE: { title: 'Collapsible', location: 'collapsible-app-bar', screen: Placeholder  },
            SEARCH: { title: 'Search', location: 'search-bar', screen: Placeholder  },
        },
    },
    LOADING: { title: 'Loading States', location: 'loading-states', screen: Placeholder  },
    FORM: { title: 'Form Validation', location: 'form-validation', screen: Placeholder  },
    I18N: { title: 'Internationalization', location: 'internationalization', screen: Placeholder  },
    LISTS: {
        title: 'Lists',
        location: 'lists',
        items: {
            ACTION: { title: 'Action', location: 'action-list', screen: Placeholder  },
            DATA: { title: 'Data', location: 'data-list', screen: Placeholder  },
            MULTISELECT: { title: 'Multiselect', location: 'multiselect-list', screen: Placeholder  },
            SORTABLE: { title: 'Sortable', location: 'sortable-list', screen: Placeholder  },
            STATUS: { title: 'Status', location: 'status-list', screen: Placeholder  },
            RESPONSIVE: { title: 'Responsive Table', location: 'responsive-table', screen: Placeholder  },
        }
    },
    BOTTOMSHEET: { title: 'Bottomsheet', location: 'bottomsheet', screen: Placeholder  },
    COMPLEX_BOTTOMSHEET: { title: 'Complex Bottomsheet', location: 'complex-bottomsheet', screen: Placeholder  },
    STEPPER: { title: 'Dynamic Stepper', location: 'dynamic-stepper', screen: Placeholder  },
};
