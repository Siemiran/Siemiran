# Architecture

## Repository

Siemiran
│
├── apps
│   └── web
│
├── docs
│
├── legacy
│
└── tools

--------------------------------------------------

Web Application

apps/web

│

├── app

├── public

└── src

    ├── components

    ├── constants

    ├── features

    └── types

--------------------------------------------------

Products Feature

src/features/products

│

├── components

├── data

├── database

├── hooks

├── lib

├── repository

├── types

└── validators

--------------------------------------------------

Dependency Flow

types

↓

database

↓

data

↓

repository

↓

components

↓

pages

--------------------------------------------------

Rules

Repository is the only Product access layer.

Legacy is read only.

Shared UI goes into src/components.

Product UI stays inside Product Feature.

Routes live only in apps/web/app.
