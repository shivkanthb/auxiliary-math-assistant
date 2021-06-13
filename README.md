![Screenshots](https://user-images.githubusercontent.com/3232159/121797083-d1e5c880-cbd2-11eb-9e15-ef4437062a4e.png)

## Auxiliary Math Assistant

Snap a photo of a mathematical question and get a detailed solution from WolframAlpha. The mathematical ocr is powered by Mathpix api.

**ENV VARS**

```
mv .env-sample .env
```

And provide the values for `MATHPIX_API_KEY`, `MATHPIX_APP_ID` & `WOLFREEALPHA_API_ENDPOINT`

**Start project**

```
npm install
expo start
```

## API Endpoint spec

Have your endpoint take the following body
POST <WOLFREEALPHA_API_ENDPOINT>

```
{
    "input": <mathematical string>
}
```

And return the response making the call to wolframalpha api

```
GET https://api.wolframalpha.com/v2/query

with query params:
appid = <app-id>
input = <input>
podstate = Step-by-step+solution
podstate = Step-by-step
podstate = Show+all+steps
scantimeout = 999
podtimeout = 999
formattimeout = 999
parsetimeout = 999
totaltimeout = 999
output = json
```

Note: replace <app-id> with your wolframalpha app id and <input> is the mathematical string sent in the body of the request

<!-- <img src="https://user-images.githubusercontent.com/3232159/101301354-68cd6480-37ed-11eb-9c8e-8f6108b7b150.gif" /> -->
