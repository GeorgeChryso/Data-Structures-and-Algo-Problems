import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class Solution {

    private final static Scanner in = new Scanner(new BufferedReader(new InputStreamReader(System.in)));

    public static void main(String[] args) {
        int cases = in.nextInt();
        int n = in.nextInt();
        int q = in.nextInt();
        for (int tt = 1; tt <= cases; tt++) 
            foo(n);
    }
    
    private static int query(int x, int y, int z) {
        System.out.println(x + " " + y + " " + z);
        int r = in.nextInt();
        if (r == -1) 
            System.exit(1);
        return r;
    }

    private static void medianSort(final ArrayList<Integer> a) {
        // base case
        if (a.size() <= 2) return;
        // split in 3 groups
        ArrayList<Integer> left = new ArrayList<>();
        ArrayList<Integer> mid = new ArrayList<>();
        ArrayList<Integer> right = new ArrayList<>();
        int b = a.get(0);
        int c = a.get(1);
        for (int i = 2; i < a.size(); i++) {
            int e = a.get(i);
            int m = query(b, c, e);
            if (m == b) {
                left.add(e);
            } else if (m == e) {
                mid.add(e);
            } else if (m == c) {
                right.add(e);
            } else {
                assert(false);
            }
        }
        // recursive left
        if (left.size() > 1) {
            medianSort(left);
            int r = query(left.get(0), left.get(1), b);
            assert(r != b);
            if (r == left.get(0)) {
                Collections.reverse(left);
            }
        }
        // recursive mid
        if (mid.size() > 1) {
            medianSort(mid);
            int r = query(b, mid.get(0), mid.get(1));
            assert(r != b);
            if (r == mid.get(1)) {
                Collections.reverse(mid);
            }
        }
        // recursive right
        if (right.size() > 1) {
            medianSort(right);
            int r = query(c, right.get(0), right.get(1));
            assert(r != c);
            if (r == right.get(1)) {
                Collections.reverse(right);
            }
        }
        // combine sorted lists with elements b, c
        a.clear();
        a.addAll(left);
        a.add(b);
        a.addAll(mid);
        a.add(c);
        a.addAll(right);
    }

    private static void foo(int n) {
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            list.add(i);
        }
        medianSort(list);
        for (int i = 0; i < n; i++) {
            if (i > 0) {
                System.out.print(" ");
            }
            System.out.print(list.get(i));
        }
        System.out.println();
        int r = in.nextInt();
        if (r != 1) {
            System.exit(1);
        }
    }
}
