/*
Find the total area covered by two rectilinear rectangles in a 2D plane.

Each rectangle is defined by its bottom left corner and top right corner as shown in the figure.

 */

 public class Solution {
     public int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {
         int area1 = (C-A)*(D-B);
         int area2 = (G-E)*(H-F);

        // 求公共面积
        int h1 = Math.max(A,E),
            h2 = Math.min(G,C),
            h = h2 > h1 ? (h2 - h1) : 0;

        int w1 = Math.max(B,F),
            w2 = Math.min(D,H),
            w = w2 > w1 ? (w2 - w1) : 0;

        return area1 + area2 - h * w;
     }
 }
