FROM python:3.7-alpine

COPY Pipfile Pipfile.lock /code/

WORKDIR /code

RUN pip install -U pip pipenv && \
    pipenv install

COPY . /code

RUN pipenv run jlpm install && \
    pipenv run jupyter labextension install . --no-build

CMD ["pipenv", "run", "jupyter", "lab", "--watch"]
