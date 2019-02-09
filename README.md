# AWS Layers Walk-through

Docs: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html


```sh
brew bundle
yarn install
cd layer; yarn install; cd ..
```

Set up the Peril aws cli env (make sure to set the region)
git s
```sh 
aws configure --profile peril

AWS Access Key ID [****************L7UA]:
AWS Secret Access Key [****************HH9A]:
Default region name [us-east-1]:
Default output format [json]:
```

Make and bundle app code

```sh
touch index.js
# edit it
rm dist/function.zip; cd app; zip ../dist/function.zip index.js; cd ..
```

Make (or get) AWS Role - https://console.aws.amazon.com/iam/home?#/roles

```
aws lambda create-function --function-name helloworld \
--zip-file fileb://./dist/function.zip --handler index.handler --runtime nodejs8.10 \
--role arn:aws:iam::656992703780:role/lambda-cli-role --profile peril
```

This makes a lambda. Add a layer runtime:

```
rm dist/layer.zip; cd layer; zip ../dist/layer.zip -r *; cd ..
aws lambda publish-layer-version --layer-name underscore-runtime --zip-file fileb://dist/layer.zip --profile peril
```

Now add it to the helloworld lambda:

```
aws lambda update-function-configuration --function-name helloworld --layers arn:aws:lambda:us-east-1:656992703780:layer:underscore-runtime:1 --profile peril
```

Now to update your lambda:

```
aws lambda update-function-code --function-name helloworld --zip-file fileb://./dist/function.zip  --profile peril
```

Invoke it:

```
aws lambda invoke --function-name helloworld dist/output.log --profile peril
```

You should be able to see:

- Layers: https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/layers
- Functions: https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/functions

In the Dashboard.

Misc notes:

- preview a zip: `unzip -l dist/app.zip`
