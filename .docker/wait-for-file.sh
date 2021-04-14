#!/usr/bin/env bash

set -e

waitFile="$1"
shift
cmd="$@"

>&2 echo "Waiting for file [$waitFile]."
until test -e $waitFile
do
  sleep 1
done

>&2 echo "Found file [$waitFile]."
exec $cmd
