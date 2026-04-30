#!/usr/bin/env python3
"""Calculate and print Fibonacci sequences."""

from __future__ import annotations

import argparse


def fibonacci_sequence(count: int) -> list[int]:
    """Return the first ``count`` numbers in the Fibonacci sequence.

    The sequence starts with 0, 1. A count of 0 returns an empty list.
    """
    if count < 0:
        raise ValueError("count must be non-negative")

    sequence: list[int] = []
    a, b = 0, 1
    for _ in range(count):
        sequence.append(a)
        a, b = b, a + b
    return sequence


def main() -> None:
    parser = argparse.ArgumentParser(description="Print the first N Fibonacci numbers.")
    parser.add_argument("count", type=int, help="number of Fibonacci values to print")
    args = parser.parse_args()

    print(" ".join(str(number) for number in fibonacci_sequence(args.count)))


if __name__ == "__main__":
    main()
