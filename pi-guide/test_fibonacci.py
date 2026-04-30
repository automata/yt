import subprocess
import sys
import unittest

from fibonacci import fibonacci_sequence


class FibonacciSequenceTests(unittest.TestCase):
    def test_zero_terms(self):
        self.assertEqual(fibonacci_sequence(0), [])

    def test_one_term(self):
        self.assertEqual(fibonacci_sequence(1), [0])

    def test_multiple_terms(self):
        self.assertEqual(fibonacci_sequence(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34])

    def test_negative_terms_raise_value_error(self):
        with self.assertRaises(ValueError):
            fibonacci_sequence(-1)

    def test_cli_prints_sequence(self):
        result = subprocess.run(
            [sys.executable, "fibonacci.py", "7"],
            text=True,
            capture_output=True,
            check=True,
        )
        self.assertEqual(result.stdout.strip(), "0 1 1 2 3 5 8")


if __name__ == "__main__":
    unittest.main()
