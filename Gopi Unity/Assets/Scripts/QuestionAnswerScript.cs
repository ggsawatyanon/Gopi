using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System;

public class QuestionAnswerScript : MonoBehaviour{
    //SCRIPTS
    public GopiScript gopiScript;
    //GAME OBJECTS
    public TextMeshProUGUI questionText;
    public TMP_InputField inputField;
    //VARIABLES
    public bool correct;

    /*
    This method is called when the answer is submitted (button is pressed or text field entered).
    */
    public void QuestionAnswer(){
        Debug.Log("Hello World");
        if(inputField.text == "Bangkok"){
            questionText.text = "Correct!";
            correct = true;
        } else{
            questionText.text = "Incorrect";
            correct = false;
        }
        gopiScript.reactAnswer(correct);
    }
}
