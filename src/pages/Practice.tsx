import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import FloatingElements from "@/components/FloatingElements";
import StudyTools from "@/components/StudyTools";
import {
  Play,
  Code,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Target,
  Brain,
  HelpCircle,
  Trophy,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { problemSpecs } from "@/lib/tests";

/* ------------------------------ QUIZ CONTENT ------------------------------- */
type QuizOption = { id: string; text: string; correct: boolean };
type QuizQ = {
  id: string;
  prompt: string;
  options: QuizOption[];
  explanation: string;
};

// AP CSP Practice Questions
const apCspQuestions: QuizQ[] = [
  {
    id: "csp-1",
    prompt: "A video-streaming Web site uses 32-bit integers to count the number of times each video has been played. In anticipation of some videos being played more times than can be represented with 32 bits, the Web site is planning to change to 64-bit integers for the counter. Which of the following best describes the result of using 64-bit integers instead of 32-bit integers?",
    options: [
      { id: "a", text: "2 times as many values can be represented.", correct: false },
      { id: "b", text: "32 times as many values can be represented.", correct: false },
      { id: "c", text: "2³² times as many values can be represented.", correct: true },
      { id: "d", text: "32² times as many values can be represented.", correct: false },
    ],
    explanation: "A 32-bit integer can represent 2³² different values, while a 64-bit integer can represent 2⁶⁴ different values. The ratio is 2⁶⁴/2³² = 2³² times as many values."
  },
  {
    id: "csp-2",
    prompt: "A programmer completes the user manual for a video game she has developed and realizes she has reversed the roles of goats and sheep throughout the text. Consider the programmer's goal of changing all occurrences of 'goats' to 'sheep' and all occurrences of 'sheep' to 'goats.' The programmer will use the fact that the word 'foxes' does not appear anywhere in the original text. Which of the following algorithms can be used to accomplish the programmer's goal?",
    options: [
      { id: "a", text: "First, change all occurrences of 'goats' to 'sheep.' Then, change all occurrences of 'sheep' to 'goats.'", correct: false },
      { id: "b", text: "First, change all occurrences of 'goats' to 'sheep.' Then, change all occurrences of 'sheep' to 'goats.' Last, change all occurrences of 'foxes' to 'sheep.'", correct: false },
      { id: "c", text: "First, change all occurrences of 'goats' to 'foxes.' Then, change all occurrences of 'sheep' to 'goats.' Last, change all occurrences of 'foxes' to 'sheep.'", correct: true },
      { id: "d", text: "First, change all occurrences of 'goats' to 'foxes.' Then, change all occurrences of 'foxes' to 'sheep.' Last, change all occurrences of 'sheep' to 'goats.'", correct: false },
    ],
    explanation: "Using a temporary word ('foxes') prevents conflicts. First change 'goats' to 'foxes', then 'sheep' to 'goats', then 'foxes' to 'sheep'. This ensures no data is lost during the swap."
  },
  {
    id: "csp-3",
    prompt: "ASCII is a character-encoding scheme that uses a numeric value to represent each character. For example, the uppercase letter 'G' is represented by the decimal (base 10) value 71. ASCII characters can also be represented by hexadecimal numbers. According to ASCII character encoding, which of the following letters is represented by the hexadecimal (base 16) number 56?",
    options: [
      { id: "a", text: "A", correct: false },
      { id: "b", text: "L", correct: false },
      { id: "c", text: "V", correct: true },
      { id: "d", text: "Y", correct: false },
    ],
    explanation: "Hexadecimal 56 converts to decimal: 5×16¹ + 6×16⁰ = 80 + 6 = 86. In ASCII, decimal 86 represents the uppercase letter 'V'."
  },
  {
    id: "csp-4",
    prompt: "Which of the following statements describes a limitation of using a computer simulation to model a real-world object or system?",
    options: [
      { id: "a", text: "Computer simulations can only be built after the real-world object or system has been created.", correct: false },
      { id: "b", text: "Computer simulations only run on very powerful computers that are not available to the general public.", correct: false },
      { id: "c", text: "Computer simulations usually make some simplifying assumptions about the real-world object or system being modeled.", correct: true },
      { id: "d", text: "It is difficult to change input parameters or conditions when using computer simulations.", correct: false },
    ],
    explanation: "Simulations often simplify complex real-world systems to make them computationally manageable, which can limit their accuracy and completeness."
  },
  {
    id: "csp-5",
    prompt: "Which of the following is a true statement about data compression?",
    options: [
      { id: "a", text: "Data compression is only useful for files being transmitted over the Internet.", correct: false },
      { id: "b", text: "Regardless of the compression technique used, once a data file is compressed, it cannot be restored to its original state.", correct: false },
      { id: "c", text: "Sending a compressed version of a file ensures that the contents of the file cannot be intercepted by an unauthorized user.", correct: false },
      { id: "d", text: "There are trade-offs involved in choosing a compression technique for storing and transmitting data.", correct: true },
    ],
    explanation: "Different compression techniques have different trade-offs between compression ratio, speed, and whether the compression is lossless or lossy."
  }
];

// AP CSA Practice Questions
const apCsaQuestions: QuizQ[] = [
  {
    id: "csa-1",
    prompt: "Consider the following code segment:\n\nfor (int i = 0; i < 20; i += 3) {\n    System.out.print(i + \" \");\n}\n\nWhat is printed as a result of executing the code segment?",
    options: [
      { id: "a", text: "4 16", correct: false },
      { id: "b", text: "4 10 16", correct: false },
      { id: "c", text: "0 6 12 18", correct: true },
      { id: "d", text: "1 4 7 10 13 16 19", correct: false },
      { id: "e", text: "0 2 4 6 8 10 12 14 16 18", correct: false },
    ],
    explanation: "The loop starts at i=0 and increments by 3 each time: 0, 3, 6, 9, 12, 15, 18. Since 21 >= 20, the loop stops at 18."
  },
  {
    id: "csa-2",
    prompt: "Consider the following code segment:\n\nString[] animals = {\"dog\", \"cat\", \"fish\", \"lizard\"};\nanimals[1] = animals[2];\nanimals[2] = animals[0];\n\nWhat is printed as a result of executing the code segment?",
    options: [
      { id: "a", text: "[dog, fish, cat]", correct: false },
      { id: "b", text: "[dog, fish, lizard]", correct: false },
      { id: "c", text: "[dog, lizard, fish]", correct: false },
      { id: "d", text: "[fish, dog, cat]", correct: false },
      { id: "e", text: "The code throws an ArrayIndexOutOfBoundsException exception.", correct: false },
    ],
    explanation: "After animals[1] = animals[2]: [dog, fish, fish, lizard]. After animals[2] = animals[0]: [dog, fish, dog, lizard]. The array becomes [dog, fish, dog, lizard]."
  },
  {
    id: "csa-3",
    prompt: "Consider the following method:\n\npublic void mystery(List<Integer> values) {\n    for (int i = 0; i < values.size(); i++) {\n        if (values.get(i) == 0) {\n            values.remove(i);\n        }\n    }\n}\n\nAssume that a List<Integer> values initially contains [0, 0, 4, 2, 5, 0, 3, 0]. What will values contain as a result of executing mystery(values)?",
    options: [
      { id: "a", text: "[0, 0, 4, 2, 5, 0, 3, 0]", correct: false },
      { id: "b", text: "[4, 2, 5, 3]", correct: false },
      { id: "c", text: "[0, 0, 0, 0, 4, 2, 5, 3]", correct: false },
      { id: "d", text: "[0, 4, 2, 5, 3]", correct: true },
      { id: "e", text: "The code throws an ArrayIndexOutOfBoundsException exception.", correct: false },
    ],
    explanation: "When removing elements while iterating forward, some elements are skipped. The first 0 is removed, but the second 0 shifts to index 0 and is skipped. Only some zeros are removed."
  },
  {
    id: "csa-4",
    prompt: "At a certain high school students receive letter grades based on the following scale:\n• 93 or above: A\n• From 84 to 92 inclusive: B\n• From 75 to 83 inclusive: C\n• Below 75: F\n\nWhich of the following code segments will assign the correct string to grade for a given integer score?\n\nI. if (score >= 93) grade = \"A\";\n   else if (score >= 84) grade = \"B\";\n   else if (score >= 75) grade = \"C\";\n   else grade = \"F\";\n\nII. if (score >= 93) grade = \"A\";\n   if (score >= 84 && score <= 92) grade = \"B\";\n   if (score >= 75 && score <= 83) grade = \"C\";\n   if (score < 75) grade = \"F\";\n\nIII. if (score >= 93) grade = \"A\";\n   else if (score >= 84 && score <= 92) grade = \"B\";\n   else if (score >= 75 && score <= 83) grade = \"C\";\n   else grade = \"F\";",
    options: [
      { id: "a", text: "II only", correct: false },
      { id: "b", text: "III only", correct: false },
      { id: "c", text: "I and II only", correct: false },
      { id: "d", text: "I and III only", correct: true },
      { id: "e", text: "I, II, and III", correct: false },
    ],
    explanation: "I and III work correctly. II fails because it uses multiple if statements instead of else-if, so a score of 95 would set grade to \"A\" then immediately overwrite it with \"B\"."
  },
  {
    id: "csa-5",
    prompt: "Consider the following output:\n1 1 1 1 1\n2 2 2 2\n3 3 3\n4 4\n5\n\nWhich of the following code segments will produce this output?",
    options: [
      { id: "a", text: "for (int j = 1; j <= 5; j++) {\n    for (int k = 1; k <= 5; k++) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}", correct: false },
      { id: "b", text: "for (int j = 1; j <= 5; j++) {\n    for (int k = 1; k <= j; k++) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}", correct: false },
      { id: "c", text: "for (int j = 1; j <= 5; j++) {\n    for (int k = 5; k >= 1; k--) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}", correct: false },
      { id: "d", text: "for (int j = 1; j <= 5; j++) {\n    for (int k = 5; k >= j; k--) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}", correct: true },
      { id: "e", text: "for (int j = 1; j <= 5; j++) {\n    for (int k = j; k <= 5; k++) {\n        System.out.print(k + \" \");\n    }\n    System.out.println();\n}", correct: false },
    ],
    explanation: "Option D: For j=1, k goes from 5 to 1 (5 times), printing \"1 \" five times. For j=2, k goes from 5 to 2 (4 times), printing \"2 \" four times, etc."
  },
  {
    id: "csa-6",
    prompt: "A car dealership needs a program to store information about the cars for sale. For each car, they want to keep track of: number of doors (2 or 4), whether the car has air conditioning, and its average number of miles per gallon. Which of the following is the best object-oriented program design?",
    options: [
      { id: "a", text: "Use one class, Car, with three instance variables: int numDoors, boolean hasAir, and double milesPerGallon.", correct: true },
      { id: "b", text: "Use four unrelated classes: Car, Doors, AirConditioning, and MilesPerGallon.", correct: false },
      { id: "c", text: "Use a class Car with three subclasses: Doors, AirConditioning, and MilesPerGallon.", correct: false },
      { id: "d", text: "Use a class Car, with a subclass Doors, with a subclass AirConditioning, with a subclass MilesPerGallon.", correct: false },
      { id: "e", text: "Use three classes: Doors, AirConditioning, and MilesPerGallon, each with a subclass Car.", correct: false },
    ],
    explanation: "Option A is the best design. These are simple attributes of a car, not separate entities that need their own classes. Using a single Car class with appropriate instance variables is the most straightforward and maintainable approach."
  },
  {
    id: "csa-7",
    prompt: "Consider the following declarations:\n\npublic interface Shape {\n    int isLargerThan(Shape other);\n}\n\npublic class Circle implements Shape {\n    // Other methods not shown\n}\n\nWhich of the following method headings of isLargerThan can be added to the declaration of the Circle class so that it will satisfy the Shape interface?\n\nI. public int isLargerThan(Shape other)\nII. public int isLargerThan(Circle other)\nIII. public boolean isLargerThan(Object other)",
    options: [
      { id: "a", text: "I only", correct: true },
      { id: "b", text: "II only", correct: false },
      { id: "c", text: "III only", correct: false },
      { id: "d", text: "I and II only", correct: false },
      { id: "e", text: "I, II, and III", correct: false },
    ],
    explanation: "Only I satisfies the interface. II has a different parameter type (Circle vs Shape), and III has a different return type (boolean vs int). The implementing method must match the interface signature exactly."
  },
  {
    id: "csa-8",
    prompt: "Consider the following method:\n\npublic void mystery(int x) {\n    System.out.print(x % 10);\n    if ((x / 10) != 0) {\n        mystery(x / 10);\n    }\n    System.out.print(x % 10);\n}\n\nWhich of the following is printed as a result of the call mystery(1234)?",
    options: [
      { id: "a", text: "1234", correct: false },
      { id: "b", text: "4321", correct: false },
      { id: "c", text: "12344321", correct: false },
      { id: "d", text: "43211234", correct: true },
      { id: "e", text: "Many digits are printed due to infinite recursion.", correct: false },
    ],
    explanation: "The method prints the last digit, then recursively processes the remaining digits, then prints the last digit again. For 1234: prints 4, calls mystery(123), prints 3, calls mystery(12), prints 2, calls mystery(1), prints 1, then prints 1, 2, 3, 4 in reverse order."
  },
  {
    id: "csa-9",
    prompt: "Consider the following two classes:\n\npublic class Dog {\n    public void act() {\n        System.out.print(\"run \");\n        eat();\n    }\n    public void eat() {\n        System.out.print(\"eat \");\n    }\n}\n\npublic class UnderDog extends Dog {\n    public void act() {\n        super.act();\n        System.out.print(\"sleep \");\n    }\n    public void eat() {\n        super.eat();\n        System.out.print(\"bark \");\n    }\n}\n\nAssume: Dog fido = new UnderDog();\nWhat is printed as a result of the call fido.act()?",
    options: [
      { id: "a", text: "run eat", correct: false },
      { id: "b", text: "run eat sleep", correct: false },
      { id: "c", text: "run eat sleep bark", correct: false },
      { id: "d", text: "run eat bark sleep", correct: true },
      { id: "e", text: "Nothing is printed due to infinite recursion.", correct: false },
    ],
    explanation: "fido.act() calls UnderDog's act() method, which calls super.act() (Dog's act), printing \"run \", then calls eat(). Since fido is an UnderDog, it calls UnderDog's eat() method, which calls super.eat() (printing \"eat \") then prints \"bark \". Finally, UnderDog's act() prints \"sleep \"."
  },
  {
    id: "csa-10",
    prompt: "Consider the following recursive method:\n\npublic static int mystery(int n) {\n    if (n <= 1) {\n        return 0;\n    } else {\n        return 1 + mystery(n / 2);\n    }\n}\n\nAssuming that k is a nonnegative integer and m = 2^k, what value is returned as a result of the call mystery(m)?",
    options: [
      { id: "a", text: "0", correct: false },
      { id: "b", text: "k", correct: true },
      { id: "c", text: "m", correct: false },
      { id: "d", text: "m/2 + 1", correct: false },
      { id: "e", text: "k^2 + 1", correct: false },
    ],
    explanation: "This method calculates log₂(n). For m = 2^k, mystery(2^k) returns k. The method recursively divides by 2 until n ≤ 1, counting the number of divisions, which equals k for 2^k."
  }
];

// AP CSP Free Response Questions
const apCspFRQs = [
  {
    id: "csp-frq-1",
    title: "CSP FRQ 1: Creative Development - Homework App",
    unit: "Unit 1: Creative Development",
    prompt: `A student is designing an app to help classmates keep track of their homework.

(a) Describe one way the student could use collaboration to improve the app during development.

(b) Identify one computing innovation that could be integrated into the app (e.g., cloud storage, notifications). Explain both a beneficial and harmful effect this innovation could have on society.

(c) Explain how an abstraction (such as a data structure or function) might be used in the program to simplify implementation.`,
    instructions: "Write detailed answers on paper. Be thorough and specific in your explanations. Consider real-world applications and think about both positive and negative impacts of technology."
  },
  {
    id: "csp-frq-2", 
    title: "CSP FRQ 2: Data - Wildlife Tracking",
    unit: "Unit 2: Data",
    prompt: `A wildlife research team collects GPS coordinates and timestamps of tagged animals.

(a) Write pseudocode that defines a list called sightings and adds at least two records, each containing an animal's ID, location, and time.

(b) Describe how this data could be cleaned or transformed to make it more useful for analysis.

(c) Explain how lossy data compression would affect the accuracy of this dataset. Give one benefit and one drawback.`,
    instructions: "Write detailed answers on paper. Use proper pseudocode syntax. Think about data quality issues and the trade-offs of compression techniques."
  },
  {
    id: "csp-frq-3",
    title: "CSP FRQ 3: Algorithms & Programming - Temperature Analysis", 
    unit: "Unit 3: Algorithms & Programming",
    prompt: `A program calculates the average temperature recorded in a city over several days.

(a) Write pseudocode for a procedure getAverage(tempList) that takes a list of temperatures and returns the average.

(b) Identify the selection and iteration used in your pseudocode.

(c) Describe one way this algorithm could be modified to handle missing or invalid data values.`,
    instructions: "Write detailed answers on paper. Focus on algorithm design, error handling, and computational thinking practices."
  },
  {
    id: "csp-frq-4",
    title: "CSP FRQ 4: Computing Systems & Networks - Messaging App",
    unit: "Unit 4: Computing Systems & Networks", 
    prompt: `A messaging app uses the Internet to transmit data between users.

(a) Explain how packets and routing allow the message to reach its destination reliably.

(b) Describe one way the app could use redundancy to increase reliability.

(c) Explain one security concern for this app and how encryption helps reduce that risk.`,
    instructions: "Write detailed answers on paper. Explain technical concepts clearly and consider real-world networking and security challenges."
  },
  {
    id: "csp-frq-5",
    title: "CSP FRQ 5: Impact of Computing - Ride-Sharing Data",
    unit: "Unit 5: Impact of Computing",
    prompt: `A ride-sharing service collects and stores large amounts of data about drivers and passengers.

(a) Describe a beneficial effect this computing innovation has on society.

(b) Describe a harmful effect this innovation may have.

(c) Explain how the digital divide might limit who benefits from this innovation.`,
    instructions: "Write detailed answers on paper. Consider diverse perspectives and the broader societal implications of technology."
  }
];

// AP CSA Free Response Questions  
const apCsaFRQs = [
  {
    id: "csa-frq-1",
    title: "CSA FRQ 1: Primitive Types - BMI Calculator",
    unit: "Unit 1: Primitive Types, Variables, and Expressions",
    prompt: `Write a method public static double computeBMI(double weightKg, double heightM) that calculates and returns the Body Mass Index (BMI = weight ÷ height²).

Handle the case where heightM is zero or negative by returning -1.

Demonstrate integer vs. double division issues with an example.

State the preconditions and postconditions clearly.`,
    instructions: "Write detailed answers on paper. Include complete Java code, test cases, and explanations of data type behavior."
  },
  {
    id: "csa-frq-2",
    title: "CSA FRQ 2: Using Objects & Strings - String Utilities",
    unit: "Unit 2: Using Objects & Strings", 
    prompt: `You are writing a utility class for string manipulation.

(a) Write a static method public static boolean isPalindrome(String word) that returns true if the string reads the same forward and backward (ignore capitalization).

(b) Explain why using == instead of .equals() to compare substrings would cause errors.

(c) Give one test case where your method might fail if you didn't account for case sensitivity.`,
    instructions: "Write detailed answers on paper. Include complete Java code and explain object reference vs. content comparison."
  },
  {
    id: "csa-frq-3", 
    title: "CSA FRQ 3: Boolean Expressions & Iteration - Increasing Runs",
    unit: "Unit 3: Boolean Expressions, if Statements, and Iteration",
    prompt: `Write a method public static boolean hasIncreasingRun(int[] nums, int runLength) that returns true if there exists a consecutive subsequence of length runLength where each number is greater than the one before it.

(a) Write the full method.

(b) Explain the difference between using a while loop and a for loop here.

(c) State one possible off-by-one error a student might make in this method.`,
    instructions: "Write detailed answers on paper. Include complete Java code and explain loop choice reasoning and common programming pitfalls."
  },
  {
    id: "csa-frq-4",
    title: "CSA FRQ 4: Writing Classes - Bank Account",
    unit: "Unit 4: Writing Classes",
    prompt: `Design a class BankAccount with:

Private instance variables String owner and double balance.

A constructor that sets owner and initializes balance to 0.

Methods deposit(double amt) and withdraw(double amt) that update the balance if amt is positive, but do nothing otherwise.

A toString() that returns "Owner: <owner>, Balance: <balance>".

Then:

(a) Write the full class.

(b) Explain why instance variables must be private.

(c) Identify one situation where a static variable would be appropriate for this class.`,
    instructions: "Write detailed answers on paper. Include complete Java class code and explain object-oriented design principles."
  },
  {
    id: "csa-frq-5",
    title: "CSA FRQ 5: Arrays, Inheritance, Recursion - Grid Operations",
    unit: "Unit 5: Arrays, ArrayList, 2D Arrays, Inheritance, Recursion", 
    prompt: `Consider the following Grid class:

public class Grid {
    private int[][] cells;
    public Grid(int rows, int cols) {
        cells = new int[rows][cols];
    }
    public int getVal(int r, int c) { return cells[r][c]; }
    public void setVal(int r, int c, int val) { cells[r][c] = val; }
}

(a) Write a method public int rowSum(int row) that returns the sum of all values in the given row.

(b) Write a method public int maxColSum() that returns the largest sum of any column.

(c) Write a recursive method public int countZeros(int r, int c) that returns the number of zeros in the grid from (r, c) to the last cell (row-major order).`,
    instructions: "Write detailed answers on paper. Include complete Java code and explain 2D array traversal and recursive thinking."
  }
];

// Sample Answers for FRQs
const cspAnswers = [
  `(a) PROCEDURE AverageScore(student)
{
   total ← 0
   count ← LENGTH(student.scores)
   FOR EACH score IN student.scores
   {
       total ← total + score
   }
   RETURN total / count
}

(b) Abstraction hides complexity by grouping related data (name, scores, GPA) into a student object. This way, code manipulates one entity instead of juggling many separate variables.

(c) Adding GPA rank is easy: just extend the student abstraction. Existing code (like AverageScore) still works without modification.`,

  `(a) TCP ensures reliability by using acknowledgments and retransmission of lost packets. Data is reassembled in correct order.

(b) Metadata = information like source IP, destination IP, file name, file size.

(c) UDP drops reliability: packets can be lost or arrive out of order. This would speed up streaming but cause corrupted or incomplete downloads.`,

  `(a) PROCEDURE FindEvens(list)
{
   evens ← []
   FOR EACH item IN list
   {
       IF (item MOD 2 = 0)
       {
           APPEND(evens, item)
       }
   }
   RETURN evens
}

(b) Efficiency = O(n), since every item is checked once.

(c) PROCEDURE FindFirstEven(list)
{
   FOR EACH item IN list
   {
       IF (item MOD 2 = 0)
       {
           RETURN item
       }
   }
   RETURN -1   // no even found
}`,

  `(a) Benefit: Doctors get real-time data → better health monitoring.
(b) Risk: Sensitive data could be stolen/misused (identity theft, tracking movements).
(c) Protection: Use encryption for transmission, access controls for who can see it.`,

  `(a) Positive: Personalized content helps users discover relevant communities.
(b) Negative: Algorithm may create echo chambers that reinforce misinformation.
(c) Bias: If training data reflects imbalances (e.g., favoring certain groups), recommendations can amplify unfairness.`
];

const csaAnswers = [
  `public static double computeBMI(double weightKg, double heightM) {
    if (heightM <= 0) {
        return -1;
    }
    return weightKg / (heightM * heightM);
}

Integer vs. double division example:
int x = 5, y = 2;
double result1 = x / y;        // result1 = 2.0 (integer division, then cast)
double result2 = (double)x / y; // result2 = 2.5 (double division)

Preconditions: weightKg > 0, heightM > 0
Postconditions: Returns BMI value or -1 for invalid input`,

  `(a) public static boolean isPalindrome(String word) {
    String lower = word.toLowerCase();
    for (int i = 0; i < lower.length() / 2; i++) {
        if (lower.charAt(i) != lower.charAt(lower.length() - 1 - i)) {
            return false;
        }
    }
    return true;
}

(b) Using == compares object references, not content. Two different String objects with same content would return false.

(c) Test case: "RaceCar" - without case handling, 'R' != 'r' would return false.`,

  `(a) public static boolean hasIncreasingRun(int[] nums, int runLength) {
    for (int i = 0; i <= nums.length - runLength; i++) {
        boolean isIncreasing = true;
        for (int j = i; j < i + runLength - 1; j++) {
            if (nums[j] >= nums[j + 1]) {
                isIncreasing = false;
                break;
            }
        }
        if (isIncreasing) return true;
    }
    return false;
}

(b) For loop is better here because we know the exact number of iterations needed.

(c) Off-by-one error: Using i < nums.length instead of i <= nums.length - runLength`,

  `public class BankAccount {
    private String owner;
    private double balance;
    
    public BankAccount(String ownerName) {
        owner = ownerName;
        balance = 0.0;
    }
    
    public void deposit(double amt) {
        if (amt > 0) {
            balance += amt;
        }
    }
    
    public void withdraw(double amt) {
        if (amt > 0) {
            balance -= amt;
        }
    }
    
    public String toString() {
        return "Owner: " + owner + ", Balance: " + balance;
    }
}

(b) Private variables prevent direct access and maintain data integrity.

(c) Static variable for total number of accounts created.`,

  `(a) public int rowSum(int row) {
    int sum = 0;
    for (int c = 0; c < cells[row].length; c++) {
        sum += cells[row][c];
    }
    return sum;
}

(b) public int maxColSum() {
    int maxSum = Integer.MIN_VALUE;
    for (int c = 0; c < cells[0].length; c++) {
        int colSum = 0;
        for (int r = 0; r < cells.length; r++) {
            colSum += cells[r][c];
        }
        maxSum = Math.max(maxSum, colSum);
    }
    return maxSum;
}

(c) public int countZeros(int r, int c) {
    if (r >= cells.length) return 0;
    if (c >= cells[r].length) return countZeros(r + 1, 0);
    return (cells[r][c] == 0 ? 1 : 0) + countZeros(r, c + 1);
}`
];

const quizBank: Record<string, QuizQ[]> = {
  "search-insert": [
    {
      id: "q1",
      prompt: "Binary search’s insertion point (when target is not found) equals…",
      options: [
        { id: "a", text: "Right pointer (r)", correct: false },
        { id: "b", text: "Middle index (m)", correct: false },
        { id: "c", text: "Left pointer (l)", correct: true },
        { id: "d", text: "Last index", correct: false },
      ],
      explanation:
        "When the loop ends without a match, l sits at the first index where the target can be inserted while maintaining order.",
    },
    {
      id: "q2",
      prompt: "Time complexity of binary search on a sorted array is:",
      options: [
        { id: "a", text: "O(n)", correct: false },
        { id: "b", text: "O(log n)", correct: true },
        { id: "c", text: "O(1)", correct: false },
        { id: "d", text: "O(n log n)", correct: false },
      ],
      explanation: "Each step halves the search space, yielding logarithmic complexity.",
    },
    {
      id: "q3",
      prompt: "Which loop condition is the most common for iterative binary search?",
      options: [
        { id: "a", text: "while (l < r)", correct: false },
        { id: "b", text: "while (l <= r)", correct: true },
        { id: "c", text: "while (true)", correct: false },
        { id: "d", text: "while (m)", correct: false },
      ],
      explanation:
        "Both patterns appear in practice, but the classic inclusive range uses while (l <= r).",
    },
  ],
  "kth-largest": [
    {
      id: "q1",
      prompt: "Quickselect’s average time complexity to find the k-th largest is:",
      options: [
        { id: "a", text: "O(n)", correct: true },
        { id: "b", text: "O(log n)", correct: false },
        { id: "c", text: "O(n log n)", correct: false },
        { id: "d", text: "O(n²)", correct: false },
      ],
      explanation: "Average case is linear; worst case is quadratic without good pivoting.",
    },
    {
      id: "q2",
      prompt: "After partitioning around a pivot p, which side do we recurse on?",
      options: [
        { id: "a", text: "Always left side", correct: false },
        { id: "b", text: "Always right side", correct: false },
        { id: "c", text: "The side that contains the k-th index", correct: true },
        { id: "d", text: "Both sides", correct: false },
      ],
      explanation:
        "Only the side that contains the answer matters, which gives the O(n) average time.",
    },
  ],
  "merge-intervals": [
    {
      id: "q1",
      prompt: "First step in merging intervals is usually:",
      options: [
        { id: "a", text: "Reverse the list", correct: false },
        { id: "b", text: "Sort by start time", correct: true },
        { id: "c", text: "Sort by end time", correct: false },
        { id: "d", text: "Use a stack to reverse", correct: false },
      ],
      explanation: "Sorting by start time lets you scan in one pass and merge overlaps.",
    },
  ],
};

/* ------------------------------- UTILITIES -------------------------------- */
const sanitize = (s: string) =>
  // keep newlines; only collapse runs of spaces/tabs (not \n)
  s.replace(/[^\S\r\n]{2,}/g, " ").trim();

/** Execute tests in the page as a fallback when the Worker is not available. */
function runTestsInPage(
  code: string,
  functionName: string,
  tests: Array<{ input: any[]; expected: any }>
) {
  const results: Array<{ passed: boolean; input: string; expected: string; actual: string }> = [];
  try {
    // Build a Function that defines user's code and returns the named function
    const factory = new Function(
      `"use strict";
${code}
if (typeof ${functionName} !== "function") { throw new Error("Function \`${functionName}\` not found"); }
return ${functionName};`
    );
    const fn = factory();

    for (const t of tests) {
      let actual: any;
      let passed = false;
      try {
        actual = fn(...t.input);
        // simple deep-ish compare by JSON stringify (good enough for our use)
        passed = JSON.stringify(actual) === JSON.stringify(t.expected);
      } catch (err: any) {
        actual = `Error: ${err?.message || String(err)}`;
      }
      results.push({
        passed,
        input: JSON.stringify(t.input),
        expected: JSON.stringify(t.expected),
        actual: typeof actual === "string" ? actual : JSON.stringify(actual),
      });
    }
    return { ok: true, results };
  } catch (err: any) {
    return { ok: false, error: err?.message || String(err) };
  }
}

/* -------------------------- PRACTICE PAGE COMPONENT ------------------------- */
const Practice = () => {
  const [activeSection, setActiveSection] = useState<'algorithms' | 'ap-csp' | 'ap-csa'>('algorithms');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; expected: string; actual: string }>
  >([]);

  // Quiz state
  const [quizSelections, setQuizSelections] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // AP Practice Quiz state
  const [apCspSelections, setApCspSelections] = useState<Record<string, string>>({});
  const [apCspSubmitted, setApCspSubmitted] = useState(false);
  const [apCspScore, setApCspScore] = useState<number | null>(null);
  
  const [apCsaSelections, setApCsaSelections] = useState<Record<string, string>>({});
  const [apCsaSubmitted, setApCsaSubmitted] = useState(false);
  const [apCsaScore, setApCsaScore] = useState<number | null>(null);

  // Worker state
  const workerRef = useRef<Worker | null>(null);
  const [workerReady, setWorkerReady] = useState(false);

  useEffect(() => {
    let w: Worker | null = null;
    try {
      // NOTE: keep the SAME relative path structure you had when it worked.
      // If your worker file is at src/workers/codeRunner.ts and this page is src/pages/Practice.tsx,
      // the following relative import is correct for Vite.
      w = new Worker(new URL("../workers/codeRunner.ts", import.meta.url), { type: "module" });
      workerRef.current = w;
      setWorkerReady(true);
      w.onmessage = (e: MessageEvent) => {
        if (e.data?.error) {
          setOutput(sanitize(`Error: ${e.data.error}`));
          setTestResults([]);
          setIsRunning(false);
          return;
        }
        const results = (e.data?.results || []).map((r: any) => ({
          passed: !!r.passed,
          input: String(r.input),
          expected: String(r.expected),
          actual: String(r.actual),
        }));
        const passedCount = results.filter((r: any) => r.passed).length;
        setTestResults(results);
        setOutput(
          sanitize(`Execution completed!\nResults: ${passedCount}/${results.length} test cases passed`)
        );
        setIsRunning(false);
      };
      w.onerror = (err) => {
        setWorkerReady(false);
        setOutput(sanitize(`Runner error (worker): ${String(err.message || err)}`));
      };
    } catch (err: any) {
      setWorkerReady(false);
      setOutput(sanitize(`Runner setup failed: ${err?.message || String(err)}`));
    }
    return () => {
      w?.terminate();
      workerRef.current = null;
    };
  }, []);

  // Reset quiz + console when switching problems
  useEffect(() => {
    setQuizSelections({});
    setQuizSubmitted(false);
    setOutput("");
    setTestResults([]);
    setCode("");
  }, [selectedProblem]);

  /* --------------------------------- DATA --------------------------------- */
  const algorithms = [
    {
      id: "merge-sort",
      name: "Merge Sort",
      description: "Master divide and conquer with these challenging problems",
      problemCount: 3,
      difficulty: "Medium",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "quick-sort",
      name: "Quick Sort",
      description: "Practice partitioning and pivot selection strategies",
      problemCount: 3,
      difficulty: "Medium",
      color: "from-purple-500 to-pink-400",
    },
    {
      id: "binary-search",
      name: "Binary Search",
      description: "Perfect your search skills with these curated challenges",
      problemCount: 3,
      difficulty: "Easy",
      color: "from-emerald-500 to-green-400",
    },
    {
      id: "sorting-basics",
      name: "Sorting Fundamentals",
      description: "Build foundation with bubble, insertion, and selection sort",
      problemCount: 4,
      difficulty: "Easy",
      color: "from-amber-400 to-orange-400",
    },
  ] as const;

  const problems = {
    "merge-sort": [
      {
        id: "merge-intervals",
        title: "Merge Intervals",
        difficulty: "Medium",
        description:
          "Given an array of intervals, merge all overlapping intervals and return an array of non-overlapping intervals.",
        detailedDescription:
          "Sort by start time, then linearly merge overlaps — similar to merging runs in merge sort.",
        keyPoints: ["Sort by start", "Linear scan", "Merge overlaps"],
        hints: [
          "Sort intervals by start time.",
          "Keep a result array; compare current.start with last.end.",
          "If overlapping, update last.end = max(last.end, current.end).",
        ],
        examples: [
          {
            input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
            output: "[[1,6],[8,10],[15,18]]",
            explanation: "Since [1,3] & [2,6] overlap, they merge into [1,6].",
          },
        ],
        template: `function merge(intervals) {
  intervals.sort((a,b) => a[0]-b[0]);
  const res = [];
  for (const iv of intervals) {
    if (!res.length || res[res.length-1][1] < iv[0]) {
      res.push([...iv]);
    } else {
      res[res.length-1][1] = Math.max(res[res.length-1][1], iv[1]);
    }
  }
  return res;
}`,
      },
    ],
    "quick-sort": [
      {
        id: "kth-largest",
        title: "Kth Largest Element",
        difficulty: "Medium",
        description: "Find the k-th largest element in an unsorted array using quickselect.",
        detailedDescription:
          "Partition the array; recurse into the side that contains the k-th largest.",
        keyPoints: ["Quickselect", "Partitioning", "Average O(n)"],
        hints: [
          "Convert k-th largest to index n-k in 0-indexed sorted order.",
          "Use Lomuto or Hoare partition; only recurse on relevant side.",
        ],
        examples: [
          {
            input: "nums=[3,2,1,5,6,4], k=2",
            output: "5",
            explanation: "Second largest is 5.",
          },
        ],
        template: `function findKthLargest(nums, k) {
  const target = nums.length - k;
  let l = 0, r = nums.length - 1;
  const swap = (i,j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
  while (l <= r) {
    const p = r;
    let i = l;
    for (let j = l; j < r; j++) if (nums[j] <= nums[p]) swap(i++, j);
    swap(i, p);
    if (i === target) return nums[i];
    if (i < target) l = i + 1; else r = i - 1;
  }
  return -1;
}`,
      },
    ],
    "binary-search": [
      {
        id: "search-insert",
        title: "Search Insert Position",
        difficulty: "Easy",
        description:
          "Given a sorted array and a target value, return the index where target should be inserted.",
        detailedDescription: "Binary search variant that returns insertion point when not found.",
        keyPoints: ["Binary search", "Insertion index", "Sorted array"],
        hints: [
          "Classic while (l <= r) with mid check.",
          "Return l when not found.",
        ],
        examples: [
          { input: "nums=[1,3,5,6], target=5", output: "2", explanation: "5 exists at index 2." },
          { input: "nums=[1,3,5,6], target=2", output: "1", explanation: "Insert at index 1." },
        ],
        template: `function searchInsert(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1; else r = m - 1;
  }
  return l;
}`,
      },
    ],
    "sorting-basics": [],
  } as const;

  /* ------------------------------ QUIZ HANDLERS ------------------------------ */
  const handleApCspSubmit = () => {
    let correct = 0;
    apCspQuestions.forEach(question => {
      const selected = apCspSelections[question.id];
      const correctOption = question.options.find(opt => opt.correct);
      if (selected === correctOption?.id) {
        correct++;
      }
    });
    setApCspScore(correct);
    setApCspSubmitted(true);
  };

  const handleApCsaSubmit = () => {
    let correct = 0;
    apCsaQuestions.forEach(question => {
      const selected = apCsaSelections[question.id];
      const correctOption = question.options.find(opt => opt.correct);
      if (selected === correctOption?.id) {
        correct++;
      }
    });
    setApCsaScore(correct);
    setApCsaSubmitted(true);
  };

  const resetApCspQuiz = () => {
    setApCspSelections({});
    setApCspSubmitted(false);
    setApCspScore(null);
  };

  const resetApCsaQuiz = () => {
    setApCsaSelections({});
    setApCsaSubmitted(false);
    setApCsaScore(null);
  };

  const downloadFRQPDF = (type: 'csp' | 'csa') => {
    const frqs = type === 'csp' ? apCspFRQs : apCsaFRQs;
    const answers = type === 'csp' ? cspAnswers : csaAnswers;
    
    let content = `
# AP ${type.toUpperCase()} Free Response Questions & Sample Answers

**Note: These are sample answers to get you thinking. There are multiple ways to answer these questions correctly!**

`;

    frqs.forEach((frq, index) => {
      content += `
## ${frq.title}
**${frq.unit}**

### Question:
${frq.prompt}

### Sample Answer:
${answers[index]}

---
`;
    });

    // Create and download the file
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AP-${type.toUpperCase()}-FRQ-Questions-and-Answers.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* ------------------------------ CODE RUNNER ------------------------------ */
  const handleRunCode = async () => {
    if (!selectedProblem) return;
    setIsRunning(true);
    setOutput(sanitize("Running your solution...\nExecuting test cases..."));

    const spec = problemSpecs[selectedProblem];
    if (!spec) {
      setOutput(sanitize("No tests available for this problem yet."));
      setIsRunning(false);
      return;
    }

    const algorithmProblems = problems[selectedAlgorithm as keyof typeof problems] as unknown as any[] || [];
    const currentProblem = algorithmProblems.find((p: any) => p.id === selectedProblem);
    const codeToRun = code || currentProblem?.template || "";

    // Prefer Worker; fall back to in-page runner if worker isn't ready
    if (workerReady && workerRef.current) {
      try {
        workerRef.current.postMessage({
          code: codeToRun,
          functionName: spec.functionName,
          tests: spec.tests,
          timeoutMs: 2500,
        });
        return; // results handled in onmessage
      } catch (err: any) {
        setOutput(sanitize(`Runner postMessage failed: ${err?.message || String(err)}\nFalling back...`));
      }
    }

    // Fallback path
    const fallback = runTestsInPage(codeToRun, spec.functionName, spec.tests);
    if (!fallback.ok) {
      setOutput(sanitize(`Error: ${fallback.error}`));
      setTestResults([]);
      setIsRunning(false);
      return;
    }
    const results = fallback.results;
    const passedCount = results.filter((r) => r.passed).length;
    setTestResults(results);
    setOutput(
      sanitize(`Execution completed!\nResults: ${passedCount}/${results.length} test cases passed`)
    );
    setIsRunning(false);
  };

  /* ------------------------------- RENDERING ------------------------------- */

  // Main section selection - show practice hub when no specific algorithm is selected
  if (!selectedAlgorithm) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
        <FloatingElements />
        <StudyTools />
        <div className="relative z-10 pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-4">Practice Hub</h1>
              <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed mb-8">
                Build real intuition with focused challenges and instant feedback.
              </p>
              
              {/* Section Tabs */}
              <div className="flex justify-center space-x-4 mb-12">
                <button
                  onClick={() => setActiveSection('algorithms')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeSection === 'algorithms'
                      ? 'bg-white text-[#0b1f24] shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  🧮 Algorithms
                </button>
                <button
                  onClick={() => setActiveSection('ap-csp')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeSection === 'ap-csp'
                      ? 'bg-white text-[#0b1f24] shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  🎯 AP CSP
                </button>
                <button
                  onClick={() => setActiveSection('ap-csa')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeSection === 'ap-csa'
                      ? 'bg-white text-[#0b1f24] shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  ☕ AP CSA
                </button>
              </div>
            </motion.div>

            {/* Algorithms Section */}
            {activeSection === 'algorithms' && (
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {algorithms.map((algorithm, index) => (
                  <motion.div
                    key={algorithm.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedAlgorithm(algorithm.id)}
                    className="group cursor-pointer"
                  >
                    <Card className="bg-white/[0.06] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full rounded-2xl">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${algorithm.color} flex items-center justify-center shadow-lg`}
                          >
                            <Code className="h-7 w-7 text-white" />
                          </div>
                          <Badge
                            variant={algorithm.difficulty === "Easy" ? "secondary" : "outline"}
                            className="text-sm font-medium"
                          >
                            {algorithm.difficulty}
                          </Badge>
                        </div>

                        <h3 className="text-2xl font-bold mb-3">{algorithm.name}</h3>
                        <p className="text-white/80 mb-6 leading-relaxed text-lg">
                          {algorithm.description}
                        </p>

                        <div className="flex items-center justify-between text-white/80">
                          <span className="font-medium">{algorithm.problemCount} challenges</span>
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">Start Practice</span>
                            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* AP CSP Section */}
            {activeSection === 'ap-csp' && (
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold mb-4">AP Computer Science Principles Practice</h2>
                  <p className="text-white/80 text-lg">Test your knowledge with official-style questions</p>
                </motion.div>

                {/* Multiple Choice Questions */}
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-green-200">📝 Multiple Choice Questions</h3>
                    <div className="flex space-x-3">
                      {apCspSubmitted && (
                        <div className="text-lg font-semibold text-green-200">
                          Score: {apCspScore}/{apCspQuestions.length}
                        </div>
                      )}
                      <Button
                        onClick={apCspSubmitted ? resetApCspQuiz : handleApCspSubmit}
                        className={`px-4 py-2 ${
                          apCspSubmitted 
                            ? 'bg-blue-500/20 text-blue-200 hover:bg-blue-500/30' 
                            : 'bg-green-500/20 text-green-200 hover:bg-green-500/30'
                        }`}
                        disabled={Object.keys(apCspSelections).length !== apCspQuestions.length}
                      >
                        {apCspSubmitted ? '🔄 Retake Quiz' : '✅ Submit Answers'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {apCspQuestions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-8 w-8 rounded-lg bg-green-500/20 text-green-200 flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-white/90 mb-4 leading-relaxed">{question.prompt}</p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                  {question.options.map((option) => {
                                    const isSelected = apCspSelections[question.id] === option.id;
                                    const isCorrect = option.correct;
                                    const showAnswer = apCspSubmitted;
                                    
                                    return (
                                      <div
                                        key={option.id}
                                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                                          showAnswer
                                            ? isCorrect
                                              ? 'bg-green-500/20 border-green-400/50 text-green-200'
                                              : isSelected
                                                ? 'bg-red-500/20 border-red-400/50 text-red-200'
                                                : 'bg-white/[0.03] border-white/10 text-white/60'
                                            : isSelected
                                              ? 'bg-blue-500/20 border-blue-400/50 text-blue-200'
                                              : 'bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.08]'
                                        }`}
                                        onClick={() => !apCspSubmitted && setApCspSelections(prev => ({
                                          ...prev,
                                          [question.id]: option.id
                                        }))}
                                      >
                                        <span className="font-medium">{option.text}</span>
                                        {showAnswer && isCorrect && <span className="ml-2">✅</span>}
                                        {showAnswer && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                                      </div>
                                    );
                                  })}
                                </div>
                                {apCspSubmitted && (
                                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                                    <p className="text-sm text-blue-200">
                                      <span className="font-semibold">Explanation:</span> {question.explanation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Free Response Questions */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-purple-200">✍️ Free Response Questions (FRQs)</h3>
                    <Button
                      onClick={() => downloadFRQPDF('csp')}
                      className="px-4 py-2 bg-purple-500/20 text-purple-200 hover:bg-purple-500/30"
                    >
                      📄 Download Questions & Sample Answers
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {apCspFRQs.map((frq, index) => (
                      <motion.div
                        key={frq.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-8 w-8 rounded-lg bg-purple-500/20 text-purple-200 flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-purple-200 mb-2">{frq.title}</h4>
                                <p className="text-sm text-purple-300/80 mb-4">{frq.unit}</p>
                                <div className="bg-white/[0.05] p-4 rounded-lg mb-4">
                                  <p className="text-white/90 leading-relaxed whitespace-pre-line">{frq.prompt}</p>
                                </div>
                                <div className="bg-yellow-500/10 border border-yellow-400/20 p-3 rounded-lg">
                                  <p className="text-sm text-yellow-200">
                                    <span className="font-semibold">📝 Instructions:</span> {frq.instructions}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AP CSA Section */}
            {activeSection === 'ap-csa' && (
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold mb-4">AP Computer Science A Practice</h2>
                  <p className="text-white/80 text-lg">Master Java concepts with practice questions</p>
                </motion.div>

                {/* Multiple Choice Questions */}
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-orange-200">📝 Multiple Choice Questions</h3>
                    <div className="flex space-x-3">
                      {apCsaSubmitted && (
                        <div className="text-lg font-semibold text-orange-200">
                          Score: {apCsaScore}/{apCsaQuestions.length}
                        </div>
                      )}
                      <Button
                        onClick={apCsaSubmitted ? resetApCsaQuiz : handleApCsaSubmit}
                        className={`px-4 py-2 ${
                          apCsaSubmitted 
                            ? 'bg-blue-500/20 text-blue-200 hover:bg-blue-500/30' 
                            : 'bg-orange-500/20 text-orange-200 hover:bg-orange-500/30'
                        }`}
                        disabled={Object.keys(apCsaSelections).length !== apCsaQuestions.length}
                      >
                        {apCsaSubmitted ? '🔄 Retake Quiz' : '✅ Submit Answers'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {apCsaQuestions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-8 w-8 rounded-lg bg-orange-500/20 text-orange-200 flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-white/90 mb-4 leading-relaxed whitespace-pre-line">{question.prompt}</p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                  {question.options.map((option) => {
                                    const isSelected = apCsaSelections[question.id] === option.id;
                                    const isCorrect = option.correct;
                                    const showAnswer = apCsaSubmitted;
                                    
                                    return (
                                      <div
                                        key={option.id}
                                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                                          showAnswer
                                            ? isCorrect
                                              ? 'bg-orange-500/20 border-orange-400/50 text-orange-200'
                                              : isSelected
                                                ? 'bg-red-500/20 border-red-400/50 text-red-200'
                                                : 'bg-white/[0.03] border-white/10 text-white/60'
                                            : isSelected
                                              ? 'bg-blue-500/20 border-blue-400/50 text-blue-200'
                                              : 'bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.08]'
                                        }`}
                                        onClick={() => !apCsaSubmitted && setApCsaSelections(prev => ({
                                          ...prev,
                                          [question.id]: option.id
                                        }))}
                                      >
                                        <span className="font-medium">{option.text}</span>
                                        {showAnswer && isCorrect && <span className="ml-2">✅</span>}
                                        {showAnswer && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                                      </div>
                                    );
                                  })}
                                </div>
                                {apCsaSubmitted && (
                                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                                    <p className="text-sm text-blue-200">
                                      <span className="font-semibold">Explanation:</span> {question.explanation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Free Response Questions */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-purple-200">✍️ Free Response Questions (FRQs)</h3>
                    <Button
                      onClick={() => downloadFRQPDF('csa')}
                      className="px-4 py-2 bg-purple-500/20 text-purple-200 hover:bg-purple-500/30"
                    >
                      📄 Download Questions & Sample Answers
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {apCsaFRQs.map((frq, index) => (
                      <motion.div
                        key={frq.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-8 w-8 rounded-lg bg-purple-500/20 text-purple-200 flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-purple-200 mb-2">{frq.title}</h4>
                                <p className="text-sm text-purple-300/80 mb-4">{frq.unit}</p>
                                <div className="bg-white/[0.05] p-4 rounded-lg mb-4">
                                  <p className="text-white/90 leading-relaxed whitespace-pre-line">{frq.prompt}</p>
                                </div>
                                <div className="bg-yellow-500/10 border border-yellow-400/20 p-3 rounded-lg">
                                  <p className="text-sm text-yellow-200">
                                    <span className="font-semibold">📝 Instructions:</span> {frq.instructions}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Problem list (only for algorithms section)
  if (!selectedProblem && selectedAlgorithm && activeSection === 'algorithms') {
    const algorithmProblems = problems[selectedAlgorithm as keyof typeof problems] || [];
    const currentAlgorithm = algorithms.find((a) => a.id === selectedAlgorithm);

    return (
      <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
        <FloatingElements />
        <StudyTools />
        <div className="relative z-10 pt-28 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
              <Button
                onClick={() => setSelectedAlgorithm(null)}
                variant="ghost"
                className="mb-6 text-white/90 hover:text-white hover:bg-white/10 p-3 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Algorithms
              </Button>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">{currentAlgorithm?.name} Challenges</h1>
              <p className="text-xl text-white/85">{currentAlgorithm?.description}</p>
            </motion.div>

            <div className="space-y-6">
              {algorithmProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedProblem(problem.id)}
                  className="group cursor-pointer"
                >
                  <Card className="bg-white/[0.06] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">{problem.title}</h3>
                            <p className="text-white/85 leading-relaxed text-lg mb-3">{problem.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {problem.keyPoints?.map((point, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-emerald-500/15 text-emerald-300 rounded-full text-sm font-medium border border-emerald-400/20"
                                >
                                  {point}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            problem.difficulty === "Easy"
                              ? "secondary"
                              : problem.difficulty === "Medium"
                              ? "outline"
                              : "destructive"
                          }
                          className="text-sm font-medium"
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-white/75">
                        <div className="flex items-center space-x-4 text-sm">
                          <span>{problem.examples?.length || 1} example{(problem.examples?.length || 1) > 1 ? "s" : ""}</span>
                          <span>•</span>
                          <span>{problem.hints?.length || 0} hint{(problem.hints?.length || 0) !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">Solve Challenge</span>
                          <Target className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Problem detail (only for algorithms section)
  if (activeSection !== 'algorithms' || !selectedProblem) return null;
  
  const algorithmProblems = problems[selectedAlgorithm as keyof typeof problems] as unknown as any[] || [];
  const currentProblem = algorithmProblems.find((p: any) => p.id === selectedProblem);
  const currentAlgorithm = algorithms.find((a) => a.id === selectedAlgorithm);
  if (!currentProblem) return null;

  const quizForProblem = quizBank[selectedProblem] || [];
  const correctCount = quizForProblem.filter(
    (q) => quizSelections[q.id] && q.options.find((o) => o.id === quizSelections[q.id])?.correct
  ).length;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
      <FloatingElements />
      <StudyTools />
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Button
              onClick={() => setSelectedProblem(null)}
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10 p-3 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to {currentAlgorithm?.name} Problems
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problem description */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl font-extrabold">{currentProblem.title}</CardTitle>
                    <Badge
                      variant={
                        currentProblem.difficulty === "Easy"
                          ? "secondary"
                          : currentProblem.difficulty === "Medium"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {currentProblem.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/85 leading-relaxed text-lg mb-4">{currentProblem.description}</p>

                    <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-2xl p-5 mb-4">
                      <div className="flex items-start space-x-3">
                        <Brain className="h-6 w-6 text-emerald-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-emerald-200 mb-1">Algorithm Connection</h4>
                          <p className="text-emerald-100/90 leading-relaxed">{currentProblem.detailedDescription}</p>
                        </div>
                      </div>
                    </div>

                    {currentProblem.keyPoints && (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <Target className="h-5 w-5 text-emerald-300 mr-2" />
                          Key Concepts
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProblem.keyPoints.map((point, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-emerald-500/15 text-emerald-200 rounded-lg text-sm font-medium border border-emerald-400/20"
                            >
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <Lightbulb className="h-5 w-5 text-yellow-300 mr-2" />
                      Examples
                    </h4>

                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="bg-white/[0.06] p-5 rounded-2xl mb-3 border border-white/10">
                        <div className="space-y-3">
                          <div className="bg-white/5 p-3 rounded-xl">
                            <span className="font-semibold block mb-1">Input:</span>
                            <code className="text-sm bg-black/30 px-3 py-2 rounded-lg border border-white/10 block">
                              {example.input}
                            </code>
                          </div>
                          <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-400/20">
                            <span className="font-semibold block mb-1">Output:</span>
                            <code className="text-sm bg-black/30 px-3 py-2 rounded-lg border border-white/10 block">
                              {example.output}
                            </code>
                          </div>
                          <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-400/20">
                            <span className="font-semibold block mb-1">Explanation:</span>
                            <p className="text-sm text-white/90 leading-relaxed">{example.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {currentProblem.hints && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <HelpCircle className="h-5 w-5 text-purple-300 mr-2" />
                          Hints
                        </h4>
                        <div className="space-y-2">
                          {currentProblem.hints.map((hint, index) => (
                            <div key={index} className="bg-purple-500/10 border border-purple-400/20 p-3 rounded-xl">
                              <p className="text-purple-100/90 text-sm leading-relaxed">
                                <strong>Hint {index + 1}:</strong> {hint}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Editor + Console + Results + Quiz */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              {/* Editor */}
              <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Code className="mr-3 h-6 w-6 text-blue-300" />
                      Code Editor
                    </CardTitle>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() =>
                          setOutput(
                            sanitize(
                              "Hint: " +
                                (currentProblem.hints?.[0] ||
                                  "Think about the key properties of " +
                                    (currentAlgorithm?.name.toLowerCase() || "the algorithm") +
                                    " and how they apply to this problem.")
                            )
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="border-yellow-400/30 text-yellow-200 hover:bg-yellow-400/10"
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Get Hint
                      </Button>
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="bg-white text-[#0b1f24] hover:bg-gray-200 font-semibold shadow-lg"
                      >
                        {isRunning ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-[#0b1f24] border-t-transparent rounded-full" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Run Code
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl p-6 bg-[#0c121b] border border-white/10">
                    <Textarea
                      value={code || currentProblem.template}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[360px] bg-transparent border-0 text-emerald-300 font-mono text-sm resize-none focus-visible:ring-0 placeholder:text-white/50"
                      placeholder="Write your solution here..."
                    />
                    {!workerReady && (
                      <p className="mt-3 text-xs text-white/60">
                        (Running in fallback mode because the sandbox worker isn’t ready)
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Console */}
              <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Brain className="mr-2 h-6 w-6 text-purple-300" />
                    Console Output
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-[#0c121b] rounded-2xl p-6 font-mono text-sm min-h-[140px] border border-white/10">
                    <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
                      {output ||
                        'Welcome to AlgoFlow Practice.\n\nWrite your solution and click "Run Code".\nUse "Get Hint" if you need guidance.\n\nHappy coding!'}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Test Results */}
              {testResults.length > 0 && (
                <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Trophy className="mr-2 h-6 w-6 text-amber-300" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testResults.map((test, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.06 }}
                          className={`p-4 rounded-xl border-l-4 ${
                            test.passed ? "border-emerald-500 bg-emerald-500/10" : "border-red-500 bg-red-500/10"
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-1">
                            {test.passed ? (
                              <CheckCircle className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-400" />
                            )}
                            <span className="font-semibold">{test.input}</span>
                          </div>
                          {!test.passed && (
                            <div className="text-sm space-y-1 ml-8">
                              <div className="text-red-200">
                                Expected:{" "}
                                <code className="bg-black/30 px-2 py-1 rounded border border-white/10">
                                  {test.expected}
                                </code>
                              </div>
                              <div className="text-red-200">
                                Got:{" "}
                                <code className="bg-black/30 px-2 py-1 rounded border border-white/10">
                                  {test.actual}
                                </code>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quiz */}
              {quizForProblem.length > 0 && (
                <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">📝 Quick Check</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {quizForProblem.map((q, idx) => {
                      const selected = quizSelections[q.id];
                      const correctOpt = q.options.find((o) => o.correct)?.id;
                      return (
                        <div key={q.id} className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p className="mb-3 text-white/90">{q.prompt}</p>
                              <div className="grid sm:grid-cols-2 gap-2">
                                {q.options.map((opt) => {
                                  const isPicked = selected === opt.id;
                                  const showCorrect = quizSubmitted && opt.id === correctOpt;
                                  const showWrong = quizSubmitted && isPicked && !opt.correct;
                                  return (
                                    <button
                                      key={opt.id}
                                      onClick={() =>
                                        !quizSubmitted &&
                                        setQuizSelections((s) => ({ ...s, [q.id]: opt.id }))
                                      }
                                      className={[
                                        "text-left px-4 py-3 rounded-lg border transition",
                                        "bg-white/[0.03] border-white/10 hover:bg-white/[0.08]",
                                        isPicked && !quizSubmitted ? "ring-2 ring-emerald-400/50" : "",
                                        showCorrect ? "bg-emerald-500/15 border-emerald-400/30" : "",
                                        showWrong ? "bg-red-500/15 border-red-400/30" : "",
                                      ].join(" ")}
                                    >
                                      <span className="font-medium">{opt.text}</span>
                                      {quizSubmitted && showCorrect && <span className="ml-2">✅</span>}
                                      {quizSubmitted && showWrong && <span className="ml-2">❌</span>}
                                    </button>
                                  );
                                })}
                              </div>
                              {quizSubmitted && (
                                <p className="mt-3 text-sm text-white/80">
                                  <span className="font-semibold">Why: </span>
                                  {q.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex items-center justify-between pt-2">
                      {!quizSubmitted ? (
                        <Button
                          onClick={() => setQuizSubmitted(true)}
                          className="bg-white text-[#0b1f24] hover:bg-gray-200 font-semibold"
                        >
                          Grade Quiz
                        </Button>
                      ) : (
                        <>
                          <div className="text-white/90 font-semibold">
                            Score: {correctCount}/{quizForProblem.length}
                          </div>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={() => {
                                setQuizSelections({});
                                setQuizSubmitted(false);
                              }}
                            >
                              Reset
                            </Button>
                            <Button
                              className={`${
                                testResults.every((t) => t.passed)
                                  ? "bg-white text-[#0b1f24] hover:bg-gray-200"
                                  : "bg-white/20 text-white/70 cursor-not-allowed"
                              } font-semibold`}
                              disabled={!testResults.every((t) => t.passed)}
                            >
                              Submit Solution
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
