#/bin/bash

pylint --load-plugins pylint_django --disable=missing-docstring --disable=imported-auth-user ./mysite/mysite
pylint --load-plugins pylint_django --disable=missing-docstring --disable=imported-auth-user --disable=line-too-long ./mysite/myapp
