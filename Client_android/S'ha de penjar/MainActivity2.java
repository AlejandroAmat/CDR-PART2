package com.example.coursemanager;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;

public class MainActivity2 extends Activity {

    private TextView text_user;
    private Button logout;
    private Button send;
    private EditText ordre;
    private TextView mostra;
    private TableLayout table;
    private CountDownTimer countDownTimer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        Bundle bundle = getIntent().getExtras();
        String text = bundle.getString("name");
        String url_conexio=bundle.getString("host");
        String uid= bundle.getString("uid");

        text_user = (TextView) findViewById(R.id.textView2);
        logout = (Button) findViewById(R.id.logout);
        send = (Button) findViewById(R.id.send);
        ordre = (EditText) findViewById(R.id.ordre);
        mostra = (TextView) findViewById(R.id.textView3);
        table = (TableLayout) findViewById(R.id.table);



        text_user.setText(text);
        startTimer();
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String disc = TRequest(url_conexio,null, true);
                opendActivity1();
            }
        });
        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String[] misatge= ordre.getText().toString().split("\\?");
                String path = ordre.getText().toString();
                mostra.setText(misatge[0]);
                eliminarTaula();
                restartTimer();
                String response = TRequest(url_conexio+"?"+path,null,false);
                try {
                    crearTaula(response.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }
    public void opendActivity1(){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
    public void crearTaula(String raw_data) throws JSONException {

        JSONObject jsonobj = new JSONObject(raw_data);
        JSONArray jsonArray = jsonobj.getJSONArray("result");

        int rowNumber = jsonArray.length();
        int columnNumber = jsonArray.getJSONObject(0).length();

        table.setStretchAllColumns(true);
        table.setShrinkAllColumns(true);

        ArrayList<String> keys = new ArrayList<>();
        int z=0;
        for ( Iterator<String> k = jsonArray.getJSONObject(0).keys() ; k.hasNext(); z++) {
            String s = k.next();
            keys.set(z,s);
        }

        for(int i=0; i<rowNumber; i++) {
            TableRow row = new TableRow(this);
            row.setGravity(Gravity.CENTER);
            row.setPadding(20,20,20,20);
           if(i==0){
               row.setBackgroundColor(getResources().getColor(R.color.lila));
           }else if(i%2==0){
               row.setBackgroundColor(getResources().getColor(R.color.blue));
           }else{
               row.setBackgroundColor(getResources().getColor(R.color.light_blue));
           }
            for(int j=0; j<columnNumber; j++) {
                TextView tv = new TextView(this);
                if(i==0){
                    tv.setTextColor(getResources().getColor(R.color.yellow));
                    tv.setText(keys.get(j));
                }else{
                    tv.setTextColor(getResources().getColor(R.color.black));
                    tv.setText(jsonArray.getJSONObject(i).get(keys.get(j)).toString());
                }
                tv.setTextSize(17);
                tv.setGravity(Gravity.CENTER);
                row.addView(tv);
            }
            table.addView(row);
        }


    }
    public void eliminarTaula(){
        table.removeAllViews();
    }
    private void startTimer(){
        countDownTimer = new CountDownTimer(100000,10000) {
            @Override
            public void onTick(long millisUntilFinished) {
            }
            @Override
            public void onFinish() {
                opendActivity1();
            }
        }.start();
    }

    private void restartTimer(){
        countDownTimer.cancel();
        countDownTimer.start();
    }
    private void stopTimer(){
        countDownTimer.cancel();
    }

}