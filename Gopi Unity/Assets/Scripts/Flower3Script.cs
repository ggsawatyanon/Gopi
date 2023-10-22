using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Flower3Script : MonoBehaviour
{
    public SpriteRenderer spriteRenderer;
    public Sprite openSprite;
    /*
    This method opens the flower so the frog can jump onto it.
    */
    public void open(){
        spriteRenderer.sprite = openSprite;
    }
}
