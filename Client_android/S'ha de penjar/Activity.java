package com.example.coursemanager;


import android.content.Intent;
import android.os.CountDownTimer;
import android.util.Log;
import android.widget.TableLayout;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.NetworkError;
import com.android.volley.NoConnectionError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.ServerError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class Activity extends AppCompatActivity {
    int size, i;
    private CountDownTimer countDownTimer;
    private long timeLeft;
    private boolean timeRunning;
    private String s;
    private RequestQueue requestQueue = Volley.newRequestQueue(this);


    public String TRequest(String url, String uid, boolean logout){

        if(uid!=null){
            url += "?"+ uid;
        }else if(logout) {
            url += "?d?";
        }

        JsonArrayRequest request = new JsonArrayRequest(
                Request.Method.GET,
                url,
                null,

                response -> {
                   size = response.length();

                   for (i=0; i<size;i++) {
                       try {

                           JSONObject jsonObject = new JSONObject(response.get(i).toString());
                           s = jsonObject.toString();

                       } catch (JSONException e) {
                           e.printStackTrace();
                       }

                   }
                },
                error -> {

                    if(error instanceof ServerError){
                        Toast.makeText(this, "server error", Toast.LENGTH_LONG).show();
                    }
                    if(error instanceof NoConnectionError){
                        Toast.makeText(this, "connection error", Toast.LENGTH_LONG).show();
                    }
                    if(error instanceof NetworkError){
                        Toast.makeText(this, "network error", Toast.LENGTH_LONG).show();
                    }

                }


        );

        requestQueue.add(request);
        return s;
    }


    }



