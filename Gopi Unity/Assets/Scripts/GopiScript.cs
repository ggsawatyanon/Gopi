using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GopiScript : MonoBehaviour{
    //SCRIPTS
    public Flower3Script flower3Script;
    //PHYSICS
    public Rigidbody2D rb;
    //VARIABLES
    int jumpPower = 300;

    /*
    Start is called before the first frame update.
    */
    void Start(){
        rb = GetComponent<Rigidbody2D>();
    }

    /*
    This method makes the frog react to the answer inputted by the player.
    Parameter(s): correct (boolean) – true if the answer is correct, false if incorrect.
    If the answer is correct – the frog should move to the next flower
    */
    public void reactAnswer(bool correct){
        if (correct){
            Debug.Log("Jump");
            jump();
        } else{
            Debug.Log("Stay");
        }
    }

    /*
    This method animates the frog jumping to the next flower
    */
    public void jump(){
        rb.AddForce(new Vector2(340, jumpPower));
        flower3Script.open();
    }
}
