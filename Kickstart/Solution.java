import java.util.Scanner;
import java.util.stream.Collectors;
import java.util.*;
import java.util.ArrayList;
import java.io.*;

public class Solution  {
  public static void main(String args[]) {
    Scanner input = new  Scanner(new BufferedReader(new InputStreamReader(System.in)));
    int T = input.nextInt(),n=input.nextInt(),Q=input.nextInt();
    for (int ks = 1; ks <= T; ks++) {
        System.out.println("1 2 3");
        Integer ss = input.nextInt();
        ArrayList<Integer> dq=new ArrayList<Integer>();
         if(ss==1){
            dq.add(2);dq.add(1);dq.add(3);
         }
         else if (ss==2) {
            dq.add(1);dq.add(2);dq.add(3);
         }
         else{
            dq.add(2);dq.add(3);dq.add(1);
         }
        for(int i=0;i<=n-4;i++){
            Integer k=i+4;
            //query for LL OR RR
            int lo=0,hi=dq.size()-1;
            System.out.println(""+dq.get(lo)+" "+k+" "+dq.get(hi));
            Integer ansa = input.nextInt();
            if(ansa==dq.get(lo))
                dq.add(0,k);
            else if( ansa==dq.get(hi))
                dq.add(k);
            else{
                lo++;
                while(lo+1<hi){
                    int mid=(lo+hi)>>1;
                    System.out.println(""+dq.get(lo)+" "+k+" "+dq.get(mid));
                    Integer ans = input.nextInt();
                    if(ans==dq.get(lo))
                        break;
                    else if (ans==dq.get(mid))
                        lo=mid;
                    else if(ans==k)
                        hi=mid;
                }
                System.out.println(""+dq.get(lo)+" "+k+" "+dq.get(hi));
                int ans = input.nextInt();
                if(ans==dq.get(lo))
                    dq.add(lo,k);
                else if(ans ==k)
                    dq.add(hi,k);
                else
                    dq.add(hi+1,k);
            }
        }
        String result = dq.stream().map(String::valueOf)
        .collect(Collectors.joining(" "));
        System.out.println(result);
        int rss= input.nextInt();
        if(rss==-1){
            input.close();
            System.exit(0);
            return;
        }
    }
    input.close();
    System.exit(0);
    return;
  }
}
