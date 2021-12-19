package com.example.coursemanager;


import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends Activity {
    private Button button;
    private TextView username;
    private TextView host;
    private TextView uid;
    private String name, u, h;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button = (Button) findViewById(R.id.login);
        username = (TextView) findViewById(R.id.username);
        host = (TextView) findViewById(R.id.host);
        uid = (TextView) findViewById(R.id.uid);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            name=username.getText().toString();
            u=uid.getText().toString();
            h=host.getText().toString();
            login(name,u,h);
            }
        });

    }

    public void openActivity2(){
        Intent intent = new Intent(this, MainActivity2.class);
        intent.putExtra("name",name);
        intent.putExtra("uid",u);
        intent.putExtra("host",h);
        startActivity(intent);
    }
    public void login(String n,String uid, String h)  {

        String response =TRequest(h,u,false);

        if(n.equals(response)) {
            openActivity2();
        }else Toast.makeText(this, "Error en l'inici de sessió", Toast.LENGTH_LONG).show();
    }

}