# React Native Design Patterns

[![](https://img.shields.io/circleci/project/github/pxblue/react-native-design-patterns/master.svg?style=flat)](https://circleci.com/gh/pxblue/react-native-design-patterns/tree/master)

This repository holds the source code examples for [PX Blue design patterns](https://pxblue.github.io/patterns), written in React Native. The code is organized to make it easy to copy and paste the examples into your own projects.

## Current Patterns

| Pattern                                                                        | Description                                                                                                                                                                                  |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Action List](https://pxblue.github.io/patterns/lists)                         | A list with actions available on individual list items                                                                                                                                       |
| [Basic Bottom Sheet](https://pxblue.github.io/patterns/overlay)                | At the top of the page, the app bar has a 3dot icon on right. When clicking on 3dot icon bottomsheet slides up from bottom of the page, revealing global actions that affect the whole page. |
| [Collapsible App Bar](https://pxblue.github.io/patterns/appbar)                | At the top of the page, the appbar is large, but if you click the appbar, it changes to a standard appbar.                                                                                   |
| [Complex Bottom Sheet](https://pxblue.github.io/patterns/overlay)              | At the top of the page, the app bar has a 3dot icon on right. When clicking on 3dot icon bottomsheet slides up from bottom of the page, revealing filters that affect the whole page.        |
| [Data List](https://pxblue.github.io/patterns/lists)                           | A basic list dynamically built from a JSON data object.                                                                                                                                      |
| [Loading States](https://pxblue.github.io/patterns/empty-states)               | Displays skeleton placeholder elements while content is loading.                                                                                                                             |
| [Multiselect List](https://pxblue.github.io/patterns/lists)                    | A multiselect list with group actions.                                                                                                                                                       |
| [Search Bar](https://pxblue.github.io/patterns/appbar)                         | At the top of the page, the app bar has a search icon on the right. After clicking on the search icon, the search bar slides in from the right of the app bar.                               |
| [Sortable List](https://pxblue.github.io/patterns/lists)                       | A sortable list with drag handles.                                                                                                                                                           |
| [Status List](https://pxblue.github.io/patterns/lists)                         | A basic list with status stripes for list items.                                                                                                                                             |

## Running Locally

To run this project (with all patterns) locally, first clone the repository:

```
git clone https://github.com/pxblue/react-native-design-patterns.git
cd react-native-design-patterns
```

Then you may run `yarn && yarn android` to start on an android device or `yarn && yarn ios` to start on an apple device.

## Folder Structure

All our design patterns are located inside `/examples`.

```
└── root
    |── /screens/Home.tsx                   // the home page
    |── /assets                             // constants used by the global layout
    |── /router                             // the main application router
    └── /examples                           // individual design patterns
```
