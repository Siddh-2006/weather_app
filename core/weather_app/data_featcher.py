import requests as re
import os
from dotenv import load_dotenv
load_dotenv()
api_key=os.getenv("api_key")
payload={"key":api_key}
base_url="http://api.weatherapi.com/v1"
def fetch_current(loc,**kwargs):
    url=base_url+"/forecast.json"
    payload.update({"q":loc,"days":1,"day_fields":"temp_c","hour_fields":"temp_c","hour":"12"})
    payload.update(**kwargs)
    data=re.get(url,params=payload)
    print(data.url)
    if data.status_code==200:
        return data.json()
    else :
        if data.status_code==400:
            if data.json()["error"]["code"]==1006:
                return {"error":"no city found"}