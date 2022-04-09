#!/usr/bin/env bash

sleep 5;
echo "Migration";
yarn db:migrate

sleep 5;
echo "Start Project"
yarn start