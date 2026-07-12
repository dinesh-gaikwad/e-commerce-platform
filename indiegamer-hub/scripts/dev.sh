#!/usr/bin/env bash
set -e
npm --prefix backend install
npm --prefix frontend install
npm --prefix backend run dev &
npm --prefix frontend run dev
